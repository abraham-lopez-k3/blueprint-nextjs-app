import React, { useState, useEffect, useRef } from "react"; // Import React and necessary hooks

// EditStageDialog component for editing a specific stage
const EditStageDialog = ({
  isOpen, // Boolean to control if the dialog is open
  onClose, // Function to close the dialog
  onSave, // Function to save the edited stage
  onDelete, // Function to delete the stage
  stageData, // Data of the stage to be edited
  totalStages, // Total number of stages for position selection
}) => {
  const [editedStage, setEditedStage] = useState(stageData || {}); // State to hold the edited stage data
  const dialogRef = useRef(null); // Ref for the dialog element

  // Update local state when stageData changes
  useEffect(() => {
    if (stageData) {
      setEditedStage(stageData); // Set editedStage to stageData when it changes
    }
  }, [stageData]);

  // Ensure the dialog gains focus when it opens
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus(); // Focus the dialog when it opens
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
      document.addEventListener("keydown", handleKeyDown); // Add event listener if the dialog is open
    }

    // Cleanup event listener when dialog closes or component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle changes to the fields in the dialog
  const handleChange = (field, value) => {
    setEditedStage((prev) => ({
      ...prev,
      [field]: value, // Update the edited stage with the new value
    }));
  };

  // Handle saving the edited stage
  const handleSave = () => {
    onSave(editedStage); // Trigger the save action with the edited stage data
  };

  return (
    isOpen && ( // Render the dialog only if it is open
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" // Overlay with background
        ref={dialogRef} // Attach the ref to the dialog
        tabIndex={-1} // Make the dialog focusable
      >
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg m-4 sm:m-0">
          <h2 className="text-xl font-bold mb-4">Edit Stage</h2>{" "}
          {/* Dialog title */}
          {/* Position Selector */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Position</label>
            <select
              value={editedStage.position} // Controlled select for position
              onChange={
                (e) => handleChange("position", parseInt(e.target.value)) // Update position
              }
              className="w-full p-2 border rounded" // Styling for the select
            >
              {/* Generate position options based on total stages */}
              {Array.from({ length: totalStages }, (_, i) => i + 1).map(
                (pos) => (
                  <option key={pos} value={pos}>
                    {pos} {/* Option for each position */}
                  </option>
                )
              )}
            </select>
          </div>
          {/* Render input fields for all editable properties of the stage */}
          {Object.keys(editedStage).map(
            (field) =>
              field !== "id" && // Exclude the ID field
              field !== "position" && ( // Exclude the position field
                <div className="mb-4" key={field}>
                  <label className="block text-sm font-semibold mb-2 capitalize">
                    {field.replace(/([A-Z])/g, " $1")} {/* Format field name */}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded" // Styling for the input field
                    value={editedStage[field]} // Controlled input for the field
                    onChange={(e) => handleChange(field, e.target.value)} // Handle changes to input
                  />
                </div>
              )
          )}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => onDelete(editedStage)} // Trigger delete action
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
            >
              Delete {/* Delete button */}
            </button>
            <div className="flex space-x-2">
              <button
                onClick={onClose} // Trigger close action
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel {/* Cancel button */}
              </button>
              <button
                onClick={handleSave} // Trigger save action
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                Save {/* Save button */}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default EditStageDialog; // Export the EditStageDialog component
