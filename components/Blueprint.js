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
              onDelete={() => onDelete(stage.id)}
              ref={null}
            />
          ))}
      </div>
    );
  }
);

export default Blueprint;
