// components/stage/Stage.js
import React, { forwardRef } from "react";
import CustomerEmotions from "./section/CustomerEmotions";
import CustomerActions from "./section/CustomerActions";
import FrontstageInteractions from "./section/FrontstageInteractions";
import BackstageInteractions from "./section/BackstageInteractions";
import SupportProcesses from "./section/SupportProcesses";
import PhysicalEvidence from "./section/PhysicalEvidence";

const Stage = forwardRef(
  ({ index, stageData, maxHeights, sectionRefs, onEdit }, ref) => {
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
        {/* Stage Title - Clickable */}
        <h2
          className="text-lg font-semibold truncate mb-4 cursor-pointer text-blue-600 hover:underline pr-2"
          onClick={() => onEdit(stageData.id)} // Make the title clickable
        >
          {stageData.stage}
        </h2>

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
