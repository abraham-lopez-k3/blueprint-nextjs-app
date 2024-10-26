import React, { useLayoutEffect, useState, useRef, forwardRef } from "react";
import Stage from "./stage/Stage";
import InfoColumn from "./help/InfoColumn";
import { useBlueprint } from "../context/BlueprintContext";

const Blueprint = forwardRef(
  ({ onEdit, onDelete, recalculateHeightsFlag }, ref) => {
    const { blueprint, setBlueprint } = useBlueprint();
    const sectionRefs = useRef({});
    const newStageRef = useRef(null);
    const [maxHeights, setMaxHeights] = useState({
      customerEmotions: 120,
      customerActions: 120,
      frontstageInteractions: 120,
      backstageInteractions: 120,
      supportProcesses: 120,
      physicalEvidence: 120,
    });

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

    const calculateMaxHeights = () => {
      const heights = {
        customerEmotions: 120,
        customerActions: 120,
        frontstageInteractions: 120,
        backstageInteractions: 120,
        supportProcesses: 120,
        physicalEvidence: 120,
      };

      blueprint.forEach((_, index) => {
        Object.keys(heights).forEach((category) => {
          const categoryHeight =
            sectionRefs.current[index]?.[category]?.offsetHeight || 120;
          heights[category] = Math.max(heights[category], categoryHeight);
        });
      });

      setMaxHeights(heights);
    };

    // Trigger reset and recalculation after the blueprint and DOM updates
    useLayoutEffect(() => {
      resetHeights();
      calculateMaxHeights();
    }, [recalculateHeightsFlag, blueprint]);

    const addStage = () => {
      const newStage = {
        id: Date.now(), // Generate a unique ID based on timestamp
        stage: `Stage ${blueprint.length + 1}`,
        customerEmotions: "",
        customerActions: "",
        frontstageInteractions: "",
        backstageInteractions: "",
        supportProcesses: "",
        physicalEvidence: "",
      };

      setBlueprint([...blueprint, newStage]);
    };

    return (
      <div className="flex overflow-x-auto p-4 sm:p-4 pl-4 sm:pl-6 gap-8 blueprint-container">
        <InfoColumn maxHeights={maxHeights} />

        {blueprint.map((stage, index) => (
          <Stage
            key={stage.id} // Use id as the key
            index={index}
            stageData={stage}
            maxHeights={maxHeights}
            sectionRefs={sectionRefs}
            onEdit={onEdit} // Pass the onEdit function to each Stage component
            onDelete={() => onDelete(stage.id)} // Pass id to the delete handler
            ref={index === blueprint.length - 1 ? newStageRef : null}
          />
        ))}
      </div>
    );
  }
);

export default Blueprint;
