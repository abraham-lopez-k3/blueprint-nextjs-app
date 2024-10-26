// components/section/FrontstageInteractions.js
import React, { forwardRef } from "react";

const FrontstageInteractions = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref}
    className="mb-8 p-4 bg-amber-300 rounded-lg shadow-sm"
    style={{ minHeight }}
  >
    <h3 className="font-bold">Frontstage Interactions</h3>
    <p className="text-gray-900">{data || "N/A"}</p>
  </div>
));

export default FrontstageInteractions;
