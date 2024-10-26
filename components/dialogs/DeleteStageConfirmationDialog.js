// components/DeleteStageConfirmationDialog.js
import React, { useEffect, useRef } from "react";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, stageName }) => {
  const dialogRef = useRef(null); // Create a ref for the dialog

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose(); // Close the dialog if Escape key is pressed
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      dialogRef.current && dialogRef.current.focus(); // Focus the dialog when open
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      tabIndex={-1}
      ref={dialogRef} // Set the ref here
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center text-gray-800 mb-4">
          Are you sure you want to delete '{stageName}'?
        </p>
        <div className="flex justify-around">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
