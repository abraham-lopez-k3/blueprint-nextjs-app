// components/help/InfoColumn.js
import React from "react";

const InfoColumn = ({ maxHeights }) => {
  return (
    <div className="flex-shrink-0 p-0 w-64">
      <h2 className="text-lg font-semibold mb-4">Key</h2>
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.customerEmotions }}
      >
        <h3 className="font-bold text-orange-500">Customer Emotions</h3>
        <p className="text-gray-900">
          Feelings experienced by the customer at this stage of the journey.
        </p>
      </div>
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.customerActions }}
      >
        <h3 className="font-bold text-orange-500">Customer Actions</h3>
        <p className="text-gray-900">
          Actions taken by the customer at this stage of the journey.
        </p>
      </div>
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.frontstageInteractions }}
      >
        <h3 className="font-bold text-amber-500">Frontstage Interactions</h3>
        <p className="text-gray-900">
          Visible interactions between the service provider and the customer.
        </p>
      </div>
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.backstageInteractions }}
      >
        <h3 className="font-bold text-blue-500">Backstage Interactions</h3>
        <p className="text-gray-900">
          Internal activities supporting the frontstage interactions.
        </p>
      </div>
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.supportProcesses }}
      >
        <h3 className="font-bold text-green-500">Support Processes</h3>
        <p className="text-gray-900">
          Processes, teams, and tools enabling the service delivery.
        </p>
      </div>
      <div
        className="mb-4 pt-4"
        style={{ minHeight: maxHeights.physicalEvidence }}
      >
        <h3 className="font-bold text-purple-500">Physical Evidence</h3>
        <p className="text-gray-900">
          Tangible items that impact customer perception, such as emails and
          receipts.
        </p>
      </div>
    </div>
  );
};

export default InfoColumn;
