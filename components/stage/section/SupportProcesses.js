// components/section/SupportProcesses.js
import React, { forwardRef } from "react";

const SupportProcesses = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref}
    className="mb-4 p-4 bg-green-300 rounded-lg shadow-sm"
    style={{ minHeight }}
  >
    <h3 className="font-bold">Support Processes</h3>
    <p className="text-gray-900">{data || "N/A"}</p>
  </div>
));

export default SupportProcesses;
