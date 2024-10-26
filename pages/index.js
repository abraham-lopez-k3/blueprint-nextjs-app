import React, { useState, useRef } from "react";
import dynamic from "next/dynamic"; // Import next/dynamic
import Navbar from "../components/navigation/Navbar";
import Blueprint from "../components/Blueprint";
import EditStageDialog from "../components/dialogs/EditStageDialog";
import DeleteStageConfirmationDialog from "../components/dialogs/DeleteStageConfirmationDialog";
import NewBlueprintConfirmationDialog from "../components/dialogs/NewBlueprintConfirmationDialog";
import { useBlueprint } from "../context/BlueprintContext";
import { defaultBlueprintData } from "../data/defaultBlueprintData";

const HomePage = () => {
  const { blueprint, setBlueprint } = useBlueprint();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [recalculateHeightsFlag, setRecalculateHeightsFlag] = useState(false);
  const [blueprintLoaded, setBlueprintLoaded] = useState(false);
  const fileInputRef = useRef(null);
  const blueprintRef = useRef(); // Add ref for the blueprint section

  const handleOpen = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);

          // Generate new unique IDs for each stage
          const updatedData = importedData.map((stage) => ({
            ...stage,
            id: Date.now() + Math.random(), // Generate a new ID
          }));

          // Clear existing local storage blueprint data before importing
          localStorage.removeItem("blueprintData");

          setBlueprint(updatedData);
          localStorage.setItem("blueprintData", JSON.stringify(updatedData));
          setRecalculateHeightsFlag((prev) => !prev);
          setBlueprintLoaded(true);
        } catch (error) {
          console.error("Error parsing JSON file:", error);
          alert(
            "Failed to load the blueprint. Please ensure the file is a valid JSON."
          );
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSave = () => {
    const saveBlueprintToFile = () => {
      // Create a deep copy of the blueprint data to avoid mutating the existing state
      const dataToSave = blueprint.map((stage) => ({
        ...stage,
        id: Date.now() + Math.random(), // Generate a unique ID using timestamp and random number
      }));

      const jsonStr = JSON.stringify(dataToSave, null, 2);

      const now = new Date();
      const dateStamp = now.toLocaleDateString("en-GB").replace(/\//g, "");
      const timeStamp = now
        .toLocaleTimeString("en-GB", { hour12: false })
        .replace(/:/g, "");
      const filename = `Blueprint-${dateStamp}-${timeStamp}.json`;

      const blob = new Blob([jsonStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    saveBlueprintToFile();
  };

  const handleNew = () => {
    setIsNewDialogOpen(true);
  };

  const confirmNewBlueprint = () => {
    setBlueprint(defaultBlueprintData);
    setBlueprintLoaded(false);
    setIsNewDialogOpen(false);
  };

  const handlePrint = async () => {
    // Define DPI as a constant
    const DPI = 96;

    // Dynamically import html2pdf.js only on the client side
    const html2pdf = (await import("html2pdf.js")).default;
    const elementContainer = blueprintRef.current;

    // Access the first child of the container, which is the actual Blueprint content
    const element = elementContainer.firstElementChild;

    // Get current date and time for the filename
    const now = new Date();
    const dateStamp = now.toLocaleDateString("en-GB").replace(/\//g, "");
    const timeStamp = now
      .toLocaleTimeString("en-GB", { hour12: false })
      .replace(/:/g, "");
    const pdfFilename = `Blueprint-${dateStamp}-${timeStamp}.pdf`;

    // Get the dimensions of the element
    const elementWidth = element.scrollWidth; // Full width in pixels
    const elementHeight = element.scrollHeight; // Full height in pixels

    // Convert pixels to millimeters based on the defined DPI
    const pxToMm = (px) => (px * 25.4) / DPI;
    const pdfWidth = pxToMm(elementWidth);
    const pdfHeight = pxToMm(elementHeight);

    // Define options for html2pdf
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5], // Adjust margins (top, right, bottom, left)
      filename: pdfFilename,
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
    html2pdf().from(element).set(options).save();
  };

  const handleAddStage = () => {
    setBlueprint([
      ...blueprint,
      {
        id: Date.now(), // Generate a unique ID based on the timestamp
        stage: `Stage ${blueprint.length + 1}`,
        customerEmotions: "",
        customerActions: "",
        frontstageInteractions: "",
        backstageInteractions: "",
        supportProcesses: "",
        physicalEvidence: "",
      },
    ]);
  };

  const handleDelete = (stageId) => {
    const stageToDelete = blueprint.find((stage) => stage.id === stageId);
    setSelectedStage(stageToDelete);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const updatedBlueprint = blueprint.filter(
      (stage) => stage.id !== selectedStage.id
    );
    setBlueprint(updatedBlueprint);
    setIsDeleteDialogOpen(false);
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStageForEdit, setSelectedStageForEdit] = useState(null);

  const handleEditStage = (stageId) => {
    const stageToEdit = blueprint.find((stage) => stage.id === stageId);
    setSelectedStageForEdit(stageToEdit);
    setIsEditDialogOpen(true);
  };

  const confirmEditStage = (editedStage) => {
    const updatedBlueprint = blueprint.map((stage) =>
      stage.id === editedStage.id ? editedStage : stage
    );
    setBlueprint(updatedBlueprint);
    setIsEditDialogOpen(false);
  };

  const triggerDeleteFromEdit = (stage) => {
    setSelectedStage(stage);
    setIsEditDialogOpen(false);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <Navbar
        onOpen={handleOpen}
        onSave={handleSave}
        onNew={handleNew}
        onPrint={handlePrint}
        onAdd={handleAddStage}
      />

      {/* Adjust content layout based on navbar position */}
      <div
        className="flex-1 mt-16 sm:mt-0 sm:ml-64 ml-0 pt-2 sm:pt-0 overflow-auto"
        ref={blueprintRef} // Use the ref to target the section for PDF conversion
      >
        <Blueprint
          onEdit={handleEditStage} // Pass handleEditStage to Blueprint
          onDelete={handleDelete}
          recalculateHeightsFlag={recalculateHeightsFlag}
        />
      </div>

      {/* Hidden file input for importing JSON */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".json"
        onChange={handleFileChange}
      />

      {/* Confirmation Dialogs */}
      <DeleteStageConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        stageName={selectedStage?.stage}
      />

      <NewBlueprintConfirmationDialog
        isOpen={isNewDialogOpen}
        onClose={() => setIsNewDialogOpen(false)}
        onConfirm={confirmNewBlueprint}
      />

      <EditStageDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={confirmEditStage}
        onDelete={triggerDeleteFromEdit}
        stageData={selectedStageForEdit}
      />
    </div>
  );
};

export default HomePage;
