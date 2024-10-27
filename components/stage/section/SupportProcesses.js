// components/section/SupportProcesses.js
import React, { forwardRef } from "react"; // Import React and forwardRef for handling refs

// Create SupportProcesses component using forwardRef to allow parent components to access its ref
const SupportProcesses = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref} // Attach ref for parent access
    className="mb-4 p-4 bg-green-300 rounded-lg shadow-sm" // Styling for the container
    style={{ minHeight }} // Set minimum height from props
  >
    <h3 className="font-bold">Support Processes</h3>{" "}
    {/* Title for the section */}
    <p className="text-gray-900">{data || "N/A"}</p>{" "}
    {/* Display the data or "N/A" if no data is available */}
  </div>
));

export default SupportProcesses; // Export the SupportProcesses component
