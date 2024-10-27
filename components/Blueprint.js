// components/Blueprint.js
import React, { useLayoutEffect, useState, useRef, forwardRef } from "react"; // Import necessary hooks and components from React
import Stage from "./stage/Stage"; // Import the Stage component to render individual stages
import InfoColumn from "./help/InfoColumn"; // Import InfoColumn for additional information display
import { useBlueprint } from "../context/BlueprintContext"; // Import context to access the blueprint state

// Create a Blueprint component using forwardRef to allow parent components to access its ref
const Blueprint = forwardRef(
  ({ onEdit, onDelete, recalculateHeightsFlag }, ref) => {
    const { blueprint, setBlueprint } = useBlueprint(); // Get blueprint state and updater function from context
    const sectionRefs = useRef({}); // Create a ref to store section references
    const newStageRef = useRef(null); // Create a ref for new stage reference (not used in this code)
    const [maxHeights, setMaxHeights] = useState({
      // State to hold maximum heights for each category
      customerEmotions: 120,
      customerActions: 120,
      frontstageInteractions: 120,
      backstageInteractions: 120,
      supportProcesses: 120,
      physicalEvidence: 120,
    });

    // Reset maximum heights to default values
    const resetHeights = () => {
      setMaxHeights({
        customerEmotions: 120,
        customerActions: 120,
        frontstageInteractions: 120,
        backstageInteractions: 120,
        supportProcesses: 120,
        physicalEvidence: 120,
      });
    };

    // Calculate maximum heights for each category based on current blueprint stages
    const calculateMaxHeights = () => {
      const heights = {
        // Initialize heights object
        customerEmotions: 120,
        customerActions: 120,
        frontstageInteractions: 120,
        backstageInteractions: 120,
        supportProcesses: 120,
        physicalEvidence: 120,
      };

      // Loop through each stage and determine the maximum height for each category
      blueprint.forEach((_, index) => {
        Object.keys(heights).forEach((category) => {
          const categoryHeight =
            sectionRefs.current[index]?.[category]?.offsetHeight || 120; // Get height of the category section or use default
          heights[category] = Math.max(heights[category], categoryHeight); // Update max height if needed
        });
      });

      setMaxHeights(heights); // Update state with the calculated heights
    };

    // Move stage left by swapping positions
    const handleMoveLeft = (stage) => {
      if (stage.position === 1) return; // Prevent moving the first stage left
      const newPosition = stage.position - 1; // Calculate new position
      const updatedBlueprint = blueprint.map((s) => {
        if (s.position === newPosition) {
          // Find the stage at the new position
          return { ...s, position: stage.position }; // Swap positions
        }
        if (s.id === stage.id) {
          // Find the current stage
          return { ...s, position: newPosition }; // Move to new position
        }
        return s; // Return unchanged stage
      });
      setBlueprint(updatedBlueprint.sort((a, b) => a.position - b.position)); // Update blueprint state and sort by position
    };

    // Move stage right by swapping positions
    const handleMoveRight = (stage) => {
      if (stage.position === blueprint.length) return; // Prevent moving the last stage right
      const newPosition = stage.position + 1; // Calculate new position
      const updatedBlueprint = blueprint.map((s) => {
        if (s.position === newPosition) {
          // Find the stage at the new position
          return { ...s, position: stage.position }; // Swap positions
        }
        if (s.id === stage.id) {
          // Find the current stage
          return { ...s, position: newPosition }; // Move to new position
        }
        return s; // Return unchanged stage
      });
      setBlueprint(updatedBlueprint.sort((a, b) => a.position - b.position)); // Update blueprint state and sort by position
    };

    // Trigger reset and recalculation after the blueprint and DOM updates
    useLayoutEffect(() => {
      resetHeights(); // Reset heights before calculating
      calculateMaxHeights(); // Calculate new maximum heights
    }, [recalculateHeightsFlag, blueprint]); // Dependency array: runs effect when flag or blueprint changes

    return (
      <div className="flex overflow-x-auto p-4 sm:p-4 pl-4 sm:pl-6 gap-8 blueprint-container">
        <InfoColumn maxHeights={maxHeights} />{" "}
        {/* Render InfoColumn with current max heights */}
        {blueprint
          .sort((a, b) => a.position - b.position) // Sort stages by position
          .map((stage) => (
            <Stage
              key={stage.id} // Use stage ID as the key for the list
              index={stage.position - 1} // Use position-based index for rendering
              stageData={stage} // Pass stage data to the Stage component
              maxHeights={maxHeights} // Pass max heights for styling
              sectionRefs={sectionRefs} // Pass refs for each section
              onEdit={onEdit} // Pass edit handler
              onDelete={onDelete} // Pass delete handler
              onMoveLeft={() => handleMoveLeft(stage)} // Pass move left handler
              onMoveRight={() => handleMoveRight(stage)} // Pass move right handler
              isFirst={stage.position === 1} // Check if this is the first stage
              isLast={stage.position === blueprint.length} // Check if this is the last stage
            />
          ))}
      </div>
    );
  }
);

export default Blueprint; // Export the Blueprint component
