// pages/index.js
import React, { useState, useRef } from "react";
import Navbar from "../components/navigation/Navbar";
import Blueprint from "../components/Blueprint";
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
  const [blueprintLoaded, setBlueprintLoaded] = useState(false); // New state to track blueprint loading
  const fileInputRef = useRef(null); // Reference for the file input

  const handleOpen = () => {
    // Trigger the file input to open when the user clicks 'Open'
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
          // Update blueprint state and local storage
          setBlueprint(importedData);
          localStorage.setItem("blueprintData", JSON.stringify(importedData));
          setRecalculateHeightsFlag((prev) => !prev); // Ensure recalculation occurs
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
      const dataToSave = blueprint;
      const jsonStr = JSON.stringify(dataToSave, null, 2);

      const now = new Date();
      const dateStamp = now.toLocaleDateString("en-GB").replace(/\//g, ""); // Format as DDMMYYYY
      const timeStamp = now
        .toLocaleTimeString("en-GB", { hour12: false })
        .replace(/:/g, ""); // Format as HHmm
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

  const handleAddStage = () => {
    setBlueprint([
      ...blueprint,
      {
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

  const handleDelete = (index) => {
    setSelectedStage(blueprint[index]);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    const updatedBlueprint = blueprint.filter(
      (stage) => stage !== selectedStage
    );
    setBlueprint(updatedBlueprint);
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex h-screen">
      <Navbar
        onOpen={handleOpen}
        onSave={handleSave}
        onNew={handleNew}
        onAdd={handleAddStage}
      />

      <div className="flex-1 ml-64 overflow-auto p-4 pl-0">
        <Blueprint
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
    </div>
  );
};

export default HomePage;