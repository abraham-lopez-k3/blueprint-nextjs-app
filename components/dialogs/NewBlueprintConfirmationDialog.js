// components/dialogs/NewBlueprintConfirmationDialog.js
import React, { useEffect, useRef } from "react"; // Import React and necessary hooks

// NewBlueprintConfirmationDialog component for confirming the creation of a new blueprint
const NewBlueprintConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  const dialogRef = useRef(null); // Create a ref for the dialog element

  useEffect(() => {
    // Handle escape key press to close the dialog
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose(); // Close the dialog if Escape key is pressed
      }
    };

    // If the dialog is open, set up the event listener and focus the dialog
    if (isOpen) {
      document.addEventListener("keydown", handleEscape); // Add keydown event listener
      dialogRef.current && dialogRef.current.focus(); // Focus the dialog when it opens
    }

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleEscape); // Remove listener on unmount or when isOpen changes
    };
  }, [isOpen, onClose]); // Dependencies: runs effect when isOpen or onClose changes

  // If the dialog is not open, return null to render nothing
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      tabIndex={-1} // Make the overlay focusable
      ref={dialogRef} // Attach the ref to the dialog
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 m-4 sm:m-0">
        {/* Dialog message asking for confirmation */}
        <p className="text-center text-gray-800 mb-4">
          Are you sure you want to create a new blueprint? All current changes
          will be lost.
        </p>
        <div className="flex justify-around">
          {/* Confirm button to proceed with creating a new blueprint */}
          <button
            onClick={onConfirm} // Trigger the confirm action
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-200"
          >
            Confirm
          </button>
          {/* Cancel button to close the dialog without any action */}
          <button
            onClick={onClose} // Trigger the close action
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewBlueprintConfirmationDialog; // Export the dialog component
