import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
export default function AddTransactionForm({ onClick }) {
  return (
    <>
      <button
        data-tooltip-id="add-tooltip"
        data-tooltip-content="Add Transaction"
        onClick={onClick}
        className="fixed bottom-6 right-6 bg-blue-600 text-black p-4 rounded-full shadow-lg text-2xl hover:bg-blue-700 active:scale-95"
      >
        +
      </button>

      <Tooltip
        id="add-tooltip"
        place="top"          // position of tooltip
        effect="solid"       // solid or float
      />
    </>
  );
}
