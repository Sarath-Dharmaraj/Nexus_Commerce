import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { MdWarning } from "react-icons/md";
import api from "../../api/api";

function DeletionAlert({ isOpen, onClose, itemType, itemId }) {
  const { revalidate } = useRevalidator();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirmDelete = async () => {
    if (!itemId) return;
    setIsDeleting(true);

    try {
      if (itemType === "card") {
        await api.delete(`/user/payment-method/${itemId}`);
      } else if (itemType === "address") {
        await api.delete(`/user/address/${itemId}`);
      }

      revalidate();
      onClose();
    } catch (error) {
      console.error(`Failed to delete ${itemType}:`, error);
      alert(
        error.response?.data?.error ||
          `Could not delete ${itemType} at this time.`,
      );
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full px-2 md:px-0 flex items-center justify-around bg-black/40 backdrop-blur-sm transition-opacity">
      <div className="flex flex-col items-center justify-start w-[400px] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden tracking-tight font-hanken">
        {/* Header */}
        <div className="flex justify-between items-center w-full px-4 py-3 bg-red-50 border-b border-red-100">
          <span className="flex items-center text-red-600 font-bold text-lg">
            <MdWarning className="mr-2 text-xl" />
            Confirm Deletion
          </span>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="text-lg text-red-400 font-bold hover:text-red-800 hover:bg-red-100 px-2.5 py-0.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="w-full px-8 py-6 text-center flex flex-col items-center gap-2">
          <p className="text-xl font-bold text-slate-800">Are you sure?</p>
          <p className="text-sm text-slate-500 font-medium">
            Do you really want to delete this{" "}
            <span className="font-bold text-slate-700 capitalize">
              {itemType}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end w-full gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer shadow-sm disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-bold text-white bg-red-600 border border-transparent rounded-xl hover:bg-red-700 shadow-sm transition-colors cursor-pointer disabled:opacity-75"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletionAlert;
