// components/stage/Stage.js
import React, { forwardRef } from "react"; // Import React and forwardRef for handling refs
import CustomerEmotions from "./section/CustomerEmotions"; // Import CustomerEmotions section component
import CustomerActions from "./section/CustomerActions"; // Import CustomerActions section component
import FrontstageInteractions from "./section/FrontstageInteractions"; // Import FrontstageInteractions section component
import BackstageInteractions from "./section/BackstageInteractions"; // Import BackstageInteractions section component
import SupportProcesses from "./section/SupportProcesses"; // Import SupportProcesses section component
import PhysicalEvidence from "./section/PhysicalEvidence"; // Import PhysicalEvidence section component
import { FiChevronLeft, FiChevronRight, FiEdit } from "react-icons/fi"; // Import icons for buttons
import { RiDeleteBin6Line } from "react-icons/ri"; // Import delete icon

// Create Stage component using forwardRef to allow parent components to access its ref
const Stage = forwardRef(
  (
    {
      index, // Position of the stage in the blueprint
      stageData, // Data for the current stage
      maxHeights, // Maximum heights for each category
      sectionRefs, // Refs for the section components
      onEdit, // Handler for editing the stage
      onMoveLeft, // Handler for moving the stage left
      onMoveRight, // Handler for moving the stage right
      onDelete, // Handler for deleting the stage
      isFirst, // Boolean indicating if this is the first stage
      isLast, // Boolean indicating if this is the last stage
    },
    ref
  ) => {
    // Initialize the refs for each category within this stage if not already present
    if (!sectionRefs.current[index]) {
      sectionRefs.current[index] = {};
    }

    return (
      <div
        className="flex-shrink-0 w-64 stage-card relative" // Flexbox styles for the stage card
        ref={ref} // Attach ref for parent access
        tabIndex={-1} // Make the div focusable
      >
        {/* Stage Title */}
        <h2 className="text-lg font-semibold truncate mb-4 pr-2">
          {stageData.position}. {stageData.stage}{" "}
          {/* Display stage position and name */}
        </h2>

        {/* Inline Buttons for Stage Actions */}
        <div
          className="flex gap-x-1 items-center mt-2 mb-4"
          data-html2canvas-ignore="true" // Ignore this section when rendering for HTML2Canvas
        >
          <button
            onClick={() => onEdit(stageData.id)} // Trigger edit handler with stage ID
            className="flex-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded"
          >
            <FiEdit className="inline mr-1" /> Edit{" "}
            {/* Edit button with icon */}
          </button>

          <button
            onClick={() => onDelete(stageData.id)} // Trigger delete handler with stage ID
            className="p-2 bg-red-100 hover:bg-red-200 text-rose-600 disabled:opacity-50 rounded"
          >
            <RiDeleteBin6Line /> {/* Delete button with icon */}
          </button>

          <button
            onClick={onMoveLeft} // Trigger move left handler
            disabled={isFirst} // Disable if this is the first stage
            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 disabled:opacity-50 rounded"
          >
            <FiChevronLeft /> {/* Move left button with icon */}
          </button>

          <button
            onClick={onMoveRight} // Trigger move right handler
            disabled={isLast} // Disable if this is the last stage
            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 disabled:opacity-50 rounded"
          >
            <FiChevronRight /> {/* Move right button with icon */}
          </button>
        </div>

        {/* Section Components with Consistent minHeight per Category */}
        <CustomerEmotions
          data={stageData.customerEmotions} // Pass customer emotions data
          minHeight={maxHeights.customerEmotions} // Set minimum height
          ref={(el) => (sectionRefs.current[index].customerEmotions = el)} // Set ref for this section
        />
        <CustomerActions
          data={stageData.customerActions} // Pass customer actions data
          minHeight={maxHeights.customerActions} // Set minimum height
          ref={(el) => (sectionRefs.current[index].customerActions = el)} // Set ref for this section
        />
        <FrontstageInteractions
          data={stageData.frontstageInteractions} // Pass frontstage interactions data
          minHeight={maxHeights.frontstageInteractions} // Set minimum height
          ref={(el) => (sectionRefs.current[index].frontstageInteractions = el)} // Set ref for this section
        />
        <BackstageInteractions
          data={stageData.backstageInteractions} // Pass backstage interactions data
          minHeight={maxHeights.backstageInteractions} // Set minimum height
          ref={(el) => (sectionRefs.current[index].backstageInteractions = el)} // Set ref for this section
        />
        <SupportProcesses
          data={stageData.supportProcesses} // Pass support processes data
          minHeight={maxHeights.supportProcesses} // Set minimum height
          ref={(el) => (sectionRefs.current[index].supportProcesses = el)} // Set ref for this section
        />
        <PhysicalEvidence
          data={stageData.physicalEvidence} // Pass physical evidence data
          minHeight={maxHeights.physicalEvidence} // Set minimum height
          ref={(el) => (sectionRefs.current[index].physicalEvidence = el)} // Set ref for this section
        />
      </div>
    );
  }
);

export default Stage; // Export the Stage component
