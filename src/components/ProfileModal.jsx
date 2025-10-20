import React, { useState } from "react";
import API from "../services/api";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function ProfileModal({ user, setUser, onClose }) {
  const [form, setForm] = useState({ name: user.name, email: user.email });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(user.profileImage);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

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

  const handleSave = async () => {
    try {
      setUploading(true);
      let imageUrl = user.profileImage;

      if (file) {
        imageUrl = await uploadToFirebase(file);
      }

      const { data } = await API.put("/users/profile", {
        name: form.name,
        email: form.email,
        profileImage: imageUrl,
      });

      setUser(data);
      alert("Profile updated successfully!");
      onClose();
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
          Update Profile
        </h2>

        <div className="flex flex-col items-center space-y-3 mb-4">
          <img
            src={preview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Name"
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Email"
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-black"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={uploading}
            className={`px-4 py-2 rounded-lg text-black ${
              uploading
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700 transition"
            }`}
          >
            {uploading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
