import React, { useState, useEffect, useRef } from "react";

const EditStageDialog = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  stageData,
  totalStages,
}) => {
  const [editedStage, setEditedStage] = useState(stageData || {});
  const dialogRef = useRef(null);

  // Update local state when stageData changes
  useEffect(() => {
    if (stageData) {
      setEditedStage(stageData);
    }
  }, [stageData]);

  // Ensure the dialog gains focus when it opens
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  // Add event listener to handle the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose(); // Close the dialog on Escape key press
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (field, value) => {
    setEditedStage((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedStage);
  };

  return (
    isOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        ref={dialogRef}
        tabIndex={-1}
      >
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg m-4 sm:m-0">
          <h2 className="text-xl font-bold mb-4">Edit Stage</h2>

          {/* Position Selector */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Position</label>
            <select
              value={editedStage.position}
              onChange={(e) =>
                handleChange("position", parseInt(e.target.value))
              }
              className="w-full p-2 border rounded"
            >
              {Array.from({ length: totalStages }, (_, i) => i + 1).map(
                (pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Other fields */}
          {Object.keys(editedStage).map(
            (field) =>
              field !== "id" &&
              field !== "position" && (
                <div className="mb-4" key={field}>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={editedStage[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                  />
                </div>
              )
          )}

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => onDelete(editedStage)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
            >
              Delete
            </button>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditStageDialog;
