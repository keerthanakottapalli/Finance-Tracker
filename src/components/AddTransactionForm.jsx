export default function AddTransactionForm({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg text-2xl hover:bg-blue-700 active:scale-95"
    >
      +
    </button>
  );
}
