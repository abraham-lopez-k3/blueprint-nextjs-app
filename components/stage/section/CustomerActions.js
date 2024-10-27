// components/section/CustomerActions.js
import React, { forwardRef } from "react"; // Import React and forwardRef for handling refs

// Create CustomerActions component using forwardRef to allow parent components to access its ref
const CustomerActions = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref} // Attach ref for parent access
    className="mb-4 p-4 bg-orange-300 rounded-lg shadow-sm" // Styling for the container with an orange background
    style={{ minHeight }} // Set minimum height from props
  >
    <h3 className="font-bold">Customer Actions</h3>{" "}
    {/* Title for the section */}
    <p className="text-gray-900">{data || "N/A"}</p>{" "}
    {/* Display the data or "N/A" if no data is available */}
  </div>
));

export default CustomerActions; // Export the CustomerActions component
