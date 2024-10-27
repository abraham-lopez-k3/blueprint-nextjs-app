// components/DeleteStageConfirmationDialog.js
import React, { useEffect, useRef } from "react"; // Import React and necessary hooks

// ConfirmationDialog component for confirming the deletion of a stage
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, stageName }) => {
  const dialogRef = useRef(null); // Create a ref for the dialog element

  // Handle the Escape key press to close the dialog
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose(); // Close the dialog if Escape key is pressed
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape); // Add event listener for keydown when dialog is open
      dialogRef.current && dialogRef.current.focus(); // Focus the dialog when it opens
    }

    // Cleanup event listener on unmount or when isOpen changes
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]); // Dependencies: runs effect when isOpen or onClose changes

  // If the dialog is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50" // Overlay styling for the dialog
      tabIndex={-1} // Make the dialog focusable
      ref={dialogRef} // Attach the ref to the dialog
    >
      <div className="bg-white p-6 rounded-lg shadow-lg m-4 sm:m-0">
        {" "}
        {/* Dialog content */}
        <p className="text-center text-gray-800 mb-4">
          Are you sure you want to delete '{stageName}'?{" "}
          {/* Confirmation message */}
        </p>
        <div className="flex justify-around">
          {" "}
          {/* Button container */}
          <button
            onClick={onConfirm} // Trigger the confirm action
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Confirm {/* Confirm button */}
          </button>
          <button
            onClick={onClose} // Trigger the close action
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel {/* Cancel button */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog; // Export the ConfirmationDialog component
