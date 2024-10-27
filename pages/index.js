import React, { useState, useRef } from "react";
import dynamic from "next/dynamic"; // Import next/dynamic for dynamic component loading
import Navbar from "../components/navigation/Navbar"; // Import the navigation component
import Blueprint from "../components/Blueprint"; // Import the Blueprint component
import EditStageDialog from "../components/dialogs/EditStageDialog"; // Import dialog for editing a stage
import DeleteStageConfirmationDialog from "../components/dialogs/DeleteStageConfirmationDialog"; // Import dialog for confirming stage deletion
import NewBlueprintConfirmationDialog from "../components/dialogs/NewBlueprintConfirmationDialog"; // Import dialog for creating a new blueprint
import { useBlueprint } from "../context/BlueprintContext"; // Import context to manage blueprint state
import { defaultBlueprintData } from "../data/defaultBlueprintData"; // Import default blueprint data

const HomePage = () => {
  // Retrieve blueprint state and setter function from context
  const { blueprint, setBlueprint } = useBlueprint();

  // State variables for managing dialogs and other UI states
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [recalculateHeightsFlag, setRecalculateHeightsFlag] = useState(false);
  const [blueprintLoaded, setBlueprintLoaded] = useState(false);

  // Refs for file input and blueprint section
  const fileInputRef = useRef(null);
  const blueprintRef = useRef(); // Ref for the blueprint section to facilitate PDF generation

  // Function to trigger file input click
  const handleOpen = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simulate a click on the hidden file input
    }
  };

  // Function to handle file change (importing JSON)
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader(); // Create a new FileReader
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result); // Parse the JSON data

          // Reassign new IDs and fix positions to be sequential
          const updatedData = importedData.map((stage, index) => ({
            ...stage,
            id: Date.now() + Math.random(), // Assign a unique ID
            position: index + 1, // Ensure positions are sequential
          }));

          localStorage.removeItem("blueprintData"); // Clear previous blueprint data from localStorage

          setBlueprint(updatedData); // Update blueprint state
          localStorage.setItem("blueprintData", JSON.stringify(updatedData)); // Save new data to localStorage
          setRecalculateHeightsFlag((prev) => !prev); // Trigger height recalculation
          setBlueprintLoaded(true); // Mark blueprint as loaded
        } catch (error) {
          console.error("Error parsing JSON file:", error); // Log any parsing errors
          alert(
            "Failed to load the blueprint. Please ensure the file is a valid JSON."
          ); // Alert user about the error
        }
      };
      reader.readAsText(file); // Read the file as text
    }
  };

  // Function to save the blueprint to a JSON file
  const handleSave = () => {
    const saveBlueprintToFile = () => {
      // Create a deep copy of the blueprint data to avoid mutating the existing state
      const dataToSave = blueprint.map((stage) => ({
        ...stage,
        id: Date.now() + Math.random(), // Generate a unique ID for each stage
      }));

      const jsonStr = JSON.stringify(dataToSave, null, 2); // Convert to JSON string with indentation

      // Generate filename based on current date and time
      const now = new Date();
      const dateStamp = now.toLocaleDateString("en-GB").replace(/\//g, "");
      const timeStamp = now
        .toLocaleTimeString("en-GB", { hour12: false })
        .replace(/:/g, "");
      const filename = `Blueprint-${dateStamp}-${timeStamp}.json`; // Construct the filename

      const blob = new Blob([jsonStr], { type: "application/json" }); // Create a Blob from the JSON string
      const url = URL.createObjectURL(blob); // Create a URL for the Blob
      const a = document.createElement("a"); // Create a temporary anchor element
      a.href = url; // Set the href to the Blob URL
      a.download = filename; // Set the download attribute to the filename
      document.body.appendChild(a); // Append anchor to the body
      a.click(); // Programmatically click the anchor to trigger download
      document.body.removeChild(a); // Remove the anchor from the body
      URL.revokeObjectURL(url); // Release the Blob URL
    };

    saveBlueprintToFile(); // Call the function to save the blueprint
  };

  // Function to open the dialog for creating a new blueprint
  const handleNew = () => {
    setIsNewDialogOpen(true); // Open the new blueprint dialog
  };

  // Function to confirm creation of a new blueprint
  const confirmNewBlueprint = () => {
    setBlueprint(defaultBlueprintData); // Set the blueprint to default data
    setBlueprintLoaded(false); // Mark blueprint as not loaded
    setIsNewDialogOpen(false); // Close the new blueprint dialog
  };

  // Function to handle printing the blueprint as a PDF
  const handlePrint = async () => {
    // Define DPI as a constant for PDF generation
    const DPI = 96;

    // Dynamically import html2pdf.js only on the client side
    const html2pdf = (await import("html2pdf.js")).default;
    const elementContainer = blueprintRef.current; // Get the blueprint section ref

    // Access the first child of the container, which is the actual Blueprint content
    const element = elementContainer.firstElementChild;

    // Get current date and time for the filename
    const now = new Date();
    const dateStamp = now.toLocaleDateString("en-GB").replace(/\//g, "");
    const timeStamp = now
      .toLocaleTimeString("en-GB", { hour12: false })
      .replace(/:/g, "");
    const pdfFilename = `Blueprint-${dateStamp}-${timeStamp}.pdf`; // Construct the PDF filename

    // Get the dimensions of the element for the PDF
    const elementWidth = element.scrollWidth; // Full width in pixels
    const elementHeight = element.scrollHeight; // Full height in pixels

    // Convert pixels to millimeters based on the defined DPI
    const pxToMm = (px) => (px * 25.4) / DPI; // Conversion function
    const pdfWidth = pxToMm(elementWidth); // Convert width to mm
    const pdfHeight = pxToMm(elementHeight); // Convert height to mm

    // Define options for html2pdf
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5], // Set margins (top, right, bottom, left)
      filename: pdfFilename, // Use constructed filename
      html2canvas: {
        scale: 4, // Increase the scale for better quality
        useCORS: true, // Enable cross-origin images
        allowTaint: true, // Allow cross-origin resources (may be required for some images)
        dpi: DPI, // Use the defined DPI
      },
      jsPDF: {
        unit: "mm", // Use millimeters as unit
        format: [pdfWidth, pdfHeight], // Use calculated dimensions as custom page size
        orientation: pdfWidth > pdfHeight ? "landscape" : "portrait", // Set orientation dynamically
      },
    };

    // Generate and save the PDF
    html2pdf().from(element).set(options).save(); // Trigger PDF generation and download
  };

  // Function to add a new stage to the blueprint
  const handleAddStage = () => {
    const newPosition = blueprint.length + 1; // Determine the new stage's position
    setBlueprint([
      ...blueprint,
      {
        id: Date.now(), // Generate a unique ID for the new stage
        position: newPosition, // Set position
        stage: `Stage ${newPosition}`, // Set stage name
        customerEmotions: "",
        customerActions: "",
        frontstageInteractions: "",
        backstageInteractions: "",
        supportProcesses: "",
        physicalEvidence: "",
      },
    ]);
  };

  // Function to initiate deletion of a stage
  const handleDelete = (stageId) => {
    const stageToDelete = blueprint.find((stage) => stage.id === stageId); // Find the stage to delete
    setSelectedStage(stageToDelete); // Set the selected stage for deletion
    setIsDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  // Function to confirm deletion of a stage
  const confirmDelete = () => {
    const updatedBlueprint = blueprint
      .filter((stage) => stage.id !== selectedStage.id) // Remove the deleted stage
      .sort((a, b) => a.position - b.position) // Sort remaining stages by position
      .map((stage, index) => ({ ...stage, position: index + 1 })); // Reassign positions

    setBlueprint(updatedBlueprint); // Update blueprint state
    setIsDeleteDialogOpen(false); // Close the delete confirmation dialog
  };

  // State for managing the edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStageForEdit, setSelectedStageForEdit] = useState(null); // State for the stage being edited

  // Function to open the edit dialog for a specific stage
  const handleEditStage = (stageId) => {
    const stageToEdit = blueprint.find((stage) => stage.id === stageId); // Find the stage to edit
    setSelectedStageForEdit(stageToEdit); // Set the selected stage for editing
    setIsEditDialogOpen(true); // Open the edit dialog
  };

  // Function to confirm edits to a stage
  const confirmEditStage = (editedStage) => {
    const originalStage = blueprint.find(
      (stage) => stage.id === editedStage.id // Find the original stage to update
    );

    if (!originalStage) {
      // If the stage is not found, exit the function
      console.error("Stage not found, unable to update position."); // Log error
      setIsEditDialogOpen(false); // Close the dialog
      return;
    }

    const originalPosition = originalStage.position; // Store the original position
    const newPosition = editedStage.position; // Get the new position

    let updatedBlueprint = blueprint;

    if (newPosition !== originalPosition) {
      if (newPosition > originalPosition) {
        // If the new position is greater, move other stages up (shift down)
        updatedBlueprint = blueprint.map((stage) => {
          if (
            stage.id !== editedStage.id &&
            stage.position > originalPosition &&
            stage.position <= newPosition
          ) {
            return { ...stage, position: stage.position - 1 }; // Adjust positions
          }
          return stage; // Return unchanged stage
        });
      } else if (newPosition < originalPosition) {
        // If the new position is less, move other stages down (shift up)
        updatedBlueprint = blueprint.map((stage) => {
          if (
            stage.id !== editedStage.id &&
            stage.position >= newPosition &&
            stage.position < originalPosition
          ) {
            return { ...stage, position: stage.position + 1 }; // Adjust positions
          }
          return stage; // Return unchanged stage
        });
      }

      // Update the edited stage to the new position
      updatedBlueprint = updatedBlueprint.map(
        (stage) => (stage.id === editedStage.id ? { ...editedStage } : stage) // Replace with edited stage
      );

      // Ensure the array is sorted by position
      updatedBlueprint.sort((a, b) => a.position - b.position); // Sort stages

      // Confirm all positions are sequential (1-based)
      updatedBlueprint = updatedBlueprint.map((stage, index) => ({
        ...stage,
        position: index + 1, // Reassign positions
      }));
    } else {
      // If position hasn't changed, just update the other fields
      updatedBlueprint = updatedBlueprint.map(
        (stage) => (stage.id === editedStage.id ? { ...editedStage } : stage) // Replace with edited stage
      );
    }

    setBlueprint(updatedBlueprint); // Update blueprint state
    setIsEditDialogOpen(false); // Close the edit dialog
  };

  // Function to trigger delete action from the edit dialog
  const triggerDeleteFromEdit = (stage) => {
    setSelectedStage(stage); // Set the stage to delete
    setIsEditDialogOpen(false); // Close the edit dialog
    setIsDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Navbar
        onOpen={handleOpen} // Handler for opening file input
        onSave={handleSave} // Handler for saving the blueprint
        onNew={handleNew} // Handler for creating a new blueprint
        onPrint={handlePrint} // Handler for printing the blueprint
        onAdd={handleAddStage} // Handler for adding a new stage
      />

      {/* Adjust content layout based on navbar position */}
      <div
        className="flex-1 mt-16 sm:mt-0 sm:ml-64 ml-0 pt-2 sm:pt-0 overflow-auto"
        ref={blueprintRef} // Reference to the blueprint section for PDF conversion
      >
        <Blueprint
          onEdit={handleEditStage} // Pass handleEditStage to Blueprint
          onDelete={handleDelete} // Pass handleDelete to Blueprint
          recalculateHeightsFlag={recalculateHeightsFlag} // Trigger height recalculation
        />
      </div>

      {/* Hidden file input for importing JSON */}
      <input
        type="file"
        ref={fileInputRef} // Reference to file input
        style={{ display: "none" }} // Hide the input
        accept=".json" // Accept only JSON files
        onChange={handleFileChange} // Handle file change
      />

      {/* Confirmation Dialogs */}
      <DeleteStageConfirmationDialog
        isOpen={isDeleteDialogOpen} // Control dialog open state
        onClose={() => setIsDeleteDialogOpen(false)} // Handler for closing the dialog
        onConfirm={confirmDelete} // Handler for confirming deletion
        stageName={selectedStage?.stage} // Display the name of the stage being deleted
      />

      <NewBlueprintConfirmationDialog
        isOpen={isNewDialogOpen} // Control dialog open state
        onClose={() => setIsNewDialogOpen(false)} // Handler for closing the dialog
        onConfirm={confirmNewBlueprint} // Handler for confirming new blueprint creation
      />

      <EditStageDialog
        isOpen={isEditDialogOpen} // Control dialog open state
        onClose={() => setIsEditDialogOpen(false)} // Handler for closing the dialog
        onSave={confirmEditStage} // Handler for saving edits
        onDelete={triggerDeleteFromEdit} // Handler for deleting from edit dialog
        stageData={selectedStageForEdit} // Pass the selected stage for editing
        totalStages={blueprint.length} // Pass total stages correctly
      />
    </div>
  );
};

export default HomePage; // Export the HomePage component
