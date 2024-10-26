// components/section/CustomerActions.js
import React, { forwardRef } from "react";

const CustomerActions = forwardRef(({ data, minHeight }, ref) => (
  <div
    ref={ref}
    className="mb-4 p-4 bg-orange-300 rounded-lg shadow-sm"
    style={{ minHeight }}
  >
    <h3 className="font-bold">Customer Actions</h3>
    <p className="text-gray-900">{data || "N/A"}</p>
  </div>
));

export default CustomerActions;
