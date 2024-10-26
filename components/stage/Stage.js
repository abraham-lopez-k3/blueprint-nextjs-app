// components/stage/Stage.js
import React, { forwardRef } from "react";
import CustomerEmotions from "./section/CustomerEmotions";
import CustomerActions from "./section/CustomerActions";
import FrontstageInteractions from "./section/FrontstageInteractions";
import BackstageInteractions from "./section/BackstageInteractions";
import SupportProcesses from "./section/SupportProcesses";
import PhysicalEvidence from "./section/PhysicalEvidence";

const Stage = forwardRef(
  ({ index, stageData, maxHeights, sectionRefs, onEdit, onDelete }, ref) => {
    // Initialize the refs for each category within this stage
    if (!sectionRefs.current[index]) {
      sectionRefs.current[index] = {};
    }

    return (
      <div
        className="flex-shrink-0 w-64 stage-card relative"
        ref={ref}
        tabIndex={-1}
      >
        {/* Edit and Delete Buttons */}
        <button
          onClick={() => onEdit(stageData.id)} // Use the unique id for edit
          className="absolute top-2 right-10 text-xs text-blue-600 bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(stageData.id)} // Use the unique id for delete
          className="absolute top-2 right-2 text-xs text-red-600 bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
        >
          Delete
        </button>

        {/* Stage Title */}
        <h2 className="text-lg font-semibold mb-4">{stageData.stage}</h2>

        {/* Section Components with Consistent minHeight per Category */}
        <CustomerEmotions
          data={stageData.customerEmotions}
          minHeight={maxHeights.customerEmotions}
          ref={(el) => (sectionRefs.current[index].customerEmotions = el)}
        />
        <CustomerActions
          data={stageData.customerActions}
          minHeight={maxHeights.customerActions}
          ref={(el) => (sectionRefs.current[index].customerActions = el)}
        />
        <FrontstageInteractions
          data={stageData.frontstageInteractions}
          minHeight={maxHeights.frontstageInteractions}
          ref={(el) => (sectionRefs.current[index].frontstageInteractions = el)}
        />
        <BackstageInteractions
          data={stageData.backstageInteractions}
          minHeight={maxHeights.backstageInteractions}
          ref={(el) => (sectionRefs.current[index].backstageInteractions = el)}
        />
        <SupportProcesses
          data={stageData.supportProcesses}
          minHeight={maxHeights.supportProcesses}
          ref={(el) => (sectionRefs.current[index].supportProcesses = el)}
        />
        <PhysicalEvidence
          data={stageData.physicalEvidence}
          minHeight={maxHeights.physicalEvidence}
          ref={(el) => (sectionRefs.current[index].physicalEvidence = el)}
        />
      </div>
    );
  }
);

export default Stage;
