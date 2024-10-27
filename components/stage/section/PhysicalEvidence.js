// components/section/PhysicalEvidence.js
import React, { forwardRef } from "react"; // Import React and forwardRef for handling refs

// Create PhysicalEvidence component using forwardRef to allow parent components to access its ref
const PhysicalEvidence = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref} // Attach ref for parent access
    className="mb-4 p-4 bg-purple-300 rounded-lg shadow-sm" // Styling for the container
    style={{ minHeight }} // Set minimum height from props
  >
    <h3 className="font-bold">Physical Evidence</h3>{" "}
    {/* Title for the section */}
    <p className="text-gray-900">{data || "N/A"}</p>{" "}
    {/* Display the data or "N/A" if no data is available */}
  </div>
));

export default PhysicalEvidence; // Export the PhysicalEvidence component
