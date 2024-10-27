// components/section/FrontstageInteractions.js
import React, { forwardRef } from "react"; // Import React and forwardRef for handling refs

// Create FrontstageInteractions component using forwardRef to allow parent components to access its ref
const FrontstageInteractions = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref} // Attach ref for parent access
    className="mb-4 p-4 bg-amber-300 rounded-lg shadow-sm" // Styling for the container with amber background
    style={{ minHeight }} // Set minimum height from props
  >
    <h3 className="font-bold">Frontstage Interactions</h3>{" "}
    {/* Title for the section */}
    <p className="text-gray-900">{data || "N/A"}</p>{" "}
    {/* Display the data or "N/A" if no data is available */}
  </div>
));

export default FrontstageInteractions; // Export the FrontstageInteractions component
