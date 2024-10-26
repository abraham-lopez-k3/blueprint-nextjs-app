// components/section/PhysicalEvidence.js
import React, { forwardRef } from "react";

const PhysicalEvidence = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref}
    className="mb-0 p-4 bg-purple-300 rounded-lg shadow-sm"
    style={{ minHeight }}
  >
    <h3 className="font-bold">Physical Evidence</h3>
    <p className="text-gray-900">{data || "N/A"}</p>
  </div>
));

export default PhysicalEvidence;
