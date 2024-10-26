// components/section/BackstageInteractions.js
import React, { forwardRef } from "react";

const BackstageInteractions = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref}
    className="mb-8 p-4 pb-8 bg-blue-300 rounded-lg shadow-sm"
    style={{ minHeight }}
  >
    <h3 className="font-bold">Backstage Interactions</h3>
    <p className="text-gray-900">{data || "N/A"}</p>
  </div>
));

export default BackstageInteractions;
