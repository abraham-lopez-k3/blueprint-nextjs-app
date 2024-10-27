// components/help/InfoColumn.js
import React from "react"; // Import React

// InfoColumn component to display key information about customer journey stages
const InfoColumn = ({ maxHeights }) => {
  return (
    <div className="flex-shrink-0 p-0 w-64">
      {" "}
      {/* Container for the info column */}
      <h2 className="text-lg font-semibold mb-4">Key</h2>{" "}
      {/* Title for the info column */}
      <h3 className="font-semibold mb-5 mt-3" data-html2canvas-ignore="true">
        Actions
      </h3>{" "}
      {/* Subtitle for actions, ignored by HTML2Canvas */}
      {/* Customer Emotions section */}
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.customerEmotions }} // Set minimum height based on max heights from props
      >
        <h3 className="font-bold text-orange-500">Customer Emotions</h3>{" "}
        {/* Section title */}
        <p className="text-gray-900">
          Feelings experienced by the customer at this stage of the journey.{" "}
          {/* Description of the section */}
        </p>
      </div>
      {/* Customer Actions section */}
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.customerActions }} // Set minimum height based on max heights from props
      >
        <h3 className="font-bold text-orange-500">Customer Actions</h3>{" "}
        {/* Section title */}
        <p className="text-gray-900">
          Actions taken by the customer at this stage of the journey.{" "}
          {/* Description of the section */}
        </p>
      </div>
      {/* Frontstage Interactions section */}
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.frontstageInteractions }} // Set minimum height based on max heights from props
      >
        <h3 className="font-bold text-amber-500">Frontstage Interactions</h3>{" "}
        {/* Section title */}
        <p className="text-gray-900">
          Visible interactions between the service provider and the customer.{" "}
          {/* Description of the section */}
        </p>
      </div>
      {/* Backstage Interactions section */}
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.backstageInteractions }} // Set minimum height based on max heights from props
      >
        <h3 className="font-bold text-blue-500">Backstage Interactions</h3>{" "}
        {/* Section title */}
        <p className="text-gray-900">
          Internal activities supporting the frontstage interactions.{" "}
          {/* Description of the section */}
        </p>
      </div>
      {/* Support Processes section */}
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.supportProcesses }} // Set minimum height based on max heights from props
      >
        <h3 className="font-bold text-green-500">Support Processes</h3>{" "}
        {/* Section title */}
        <p className="text-gray-900">
          Processes, teams, and tools enabling the service delivery.{" "}
          {/* Description of the section */}
        </p>
      </div>
      {/* Physical Evidence section */}
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.physicalEvidence }} // Set minimum height based on max heights from props
      >
        <h3 className="font-bold text-purple-500">Physical Evidence</h3>{" "}
        {/* Section title */}
        <p className="text-gray-900">
          Tangible items that impact customer perception, such as emails and
          receipts. {/* Description of the section */}
        </p>
      </div>
    </div>
  );
};

export default InfoColumn; // Export the InfoColumn component
