// components/Blueprint.js
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

    // Move stage left by swapping positions
    const handleMoveLeft = (stage) => {
      if (stage.position === 1) return;
      const newPosition = stage.position - 1;
      const updatedBlueprint = blueprint.map((s) => {
        if (s.position === newPosition) {
          return { ...s, position: stage.position };
        }
        if (s.id === stage.id) {
          return { ...s, position: newPosition };
        }
        return s;
      });
      setBlueprint(updatedBlueprint.sort((a, b) => a.position - b.position));
    };

    // Move stage right by swapping positions
    const handleMoveRight = (stage) => {
      if (stage.position === blueprint.length) return;
      const newPosition = stage.position + 1;
      const updatedBlueprint = blueprint.map((s) => {
        if (s.position === newPosition) {
          return { ...s, position: stage.position };
        }
        if (s.id === stage.id) {
          return { ...s, position: newPosition };
        }
        return s;
      });
      setBlueprint(updatedBlueprint.sort((a, b) => a.position - b.position));
    };

    // Trigger reset and recalculation after the blueprint and DOM updates
    useLayoutEffect(() => {
      resetHeights();
      calculateMaxHeights();
    }, [recalculateHeightsFlag, blueprint]);

    return (
      <div className="flex overflow-x-auto p-4 sm:p-4 pl-4 sm:pl-6 gap-8 blueprint-container">
        <InfoColumn maxHeights={maxHeights} />

        {blueprint
          .sort((a, b) => a.position - b.position) // Sort by position
          .map((stage) => (
            <Stage
              key={stage.id}
              index={stage.position - 1} // Use position-based index
              stageData={stage}
              maxHeights={maxHeights}
              sectionRefs={sectionRefs}
              onEdit={onEdit}
              onMoveLeft={() => handleMoveLeft(stage)}
              onMoveRight={() => handleMoveRight(stage)}
              isFirst={stage.position === 1}
              isLast={stage.position === blueprint.length}
            />
          ))}
      </div>
    );
  }
);

export default Blueprint;
