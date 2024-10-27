// components/stage/Stage.js
import React, { forwardRef } from "react";
import CustomerEmotions from "./section/CustomerEmotions";
import CustomerActions from "./section/CustomerActions";
import FrontstageInteractions from "./section/FrontstageInteractions";
import BackstageInteractions from "./section/BackstageInteractions";
import SupportProcesses from "./section/SupportProcesses";
import PhysicalEvidence from "./section/PhysicalEvidence";
import { FiChevronLeft, FiChevronRight, FiEdit } from "react-icons/fi";

const Stage = forwardRef(
  (
    {
      index,
      stageData,
      maxHeights,
      sectionRefs,
      onEdit,
      onMoveLeft,
      onMoveRight,
      isFirst,
      isLast,
    },
    ref
  ) => {
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
        {/* Stage Title */}
        <h2 className="text-lg font-semibold truncate mb-4 pr-2">
          {stageData.position}. {stageData.stage}
        </h2>

        {/* Inline Buttons */}
        <div
          className="flex gap-x-1 items-center mt-2 mb-4"
          data-html2canvas-ignore="true"
        >
          <button
            onClick={() => onEdit(stageData.id)}
            className="flex-1 px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded"
          >
            <FiEdit className="inline mr-1" /> Edit
          </button>

          <button
            onClick={onMoveLeft}
            disabled={isFirst}
            className="p-2 bg-blue-100 bg-blue-100 hover:bg-blue-200 text-blue-600 disabled:opacity-50 rounded"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={onMoveRight}
            disabled={isLast}
            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 disabled:opacity-50 rounded"
          >
            <FiChevronRight />
          </button>
        </div>

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
