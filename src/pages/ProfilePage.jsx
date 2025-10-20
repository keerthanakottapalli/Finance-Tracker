import React, { useEffect, useState } from "react";
import API from "../services/api";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ProfileModal({ onClose, onProfileUpdate }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/users/profile");
        setUser(data);
      } catch (error) {
        setError("Failed to load profile.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle file preview
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // Upload to Firebase
  const uploadToFirebase = async (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `profileImages/${Date.now()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => resolve(url))
            .catch((err) => reject(err));
        }
      );
    });
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      setUploading(true);
      let imageUrl = user.profileImage;

      if (file) {
        imageUrl = await uploadToFirebase(file);
      }

      const { data } = await API.put("/users/profile", {
        name: user.name,
        email: user.email,
        profileImage: imageUrl,
      });

      setUser(data);
      onProfileUpdate(data); // ✅ Update parent (Navbar)
      onClose(); // ✅ Close modal
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded-xl">Loading...</div>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Edit Profile
        </h2>

        <div className="flex flex-col items-center space-y-3">
          <img
            src={preview || user.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-gray-500"
          />
        </div>

        <div className="mt-4 space-y-2">
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={uploading}
          className={`mt-5 w-full py-2 rounded-lg ${
            uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {uploading ? "Updating..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;
