// components/DeleteStageConfirmationDialog.js
import React, { useEffect } from 'react';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, stageName }) => {
  useEffect(() => {
    // Define the Escape key handler
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose(); // Call the onClose function if Escape is pressed
      }
    };

    // Add event listener when the dialog is open
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    // Clean up the event listener when the dialog is closed
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]); // Dependency array ensures this runs when isOpen changes

  if (!isOpen) return null; // Don’t render if the dialog is closed

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
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
