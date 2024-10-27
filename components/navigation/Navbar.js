// components/navigation/Navbar.js
import React from "react"; // Import React
import {
  AiOutlineFolderOpen,
  AiOutlineSave,
  AiOutlinePrinter,
  AiOutlinePlus,
  AiOutlineFileAdd,
} from "react-icons/ai"; // Import icons for use in buttons

// Navbar component to render the navigation bar
const Navbar = ({ onOpen, onSave, onPrint, onNew, onAdd }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg z-10 fixed top-0 w-full sm:w-64 sm:left-0 sm:top-0 sm:h-screen flex flex-row sm:flex-col items-center sm:items-start">
      {/* Title with truncation for responsiveness */}
      <h1 className="text-xl font-semibold flex-1 truncate pr-4 sm:mb-6">
        Service Blueprint
      </h1>

      {/* Button container for navigation actions */}
      <div className="flex flex-row sm:flex-col sm:w-full space-x-2 sm:space-x-0 sm:space-y-4 sm:mt-0">
        {/* Button to create a new blueprint */}
        <button
          onClick={onNew} // Trigger new action
          className="flex items-center justify-center sm:justify-start p-2 bg-sky-600 hover:bg-sky-500 rounded sm:w-full transition-all duration-200 ease-in-out"
        >
          <AiOutlineFileAdd className="text-2xl mr-0 sm:mr-2" />{" "}
          {/* Icon for new action */}
          <span className="hidden sm:inline">New</span>{" "}
          {/* Label for button, hidden on smaller screens */}
        </button>
        {/* Button to open an existing blueprint */}
        <button
          onClick={onOpen} // Trigger open action
          className="flex items-center justify-center sm:justify-start p-2 bg-sky-600 hover:bg-sky-500 rounded sm:w-full transition-all duration-200 ease-in-out"
        >
          <AiOutlineFolderOpen className="text-2xl mr-0 sm:mr-2" />{" "}
          {/* Icon for open action */}
          <span className="hidden sm:inline">Open</span>{" "}
          {/* Label for button, hidden on smaller screens */}
        </button>
        {/* Button to save the current blueprint */}
        <button
          onClick={onSave} // Trigger save action
          className="flex items-center justify-center sm:justify-start p-2 bg-sky-600 hover:bg-sky-500 rounded sm:w-full transition-all duration-200 ease-in-out"
        >
          <AiOutlineSave className="text-2xl mr-0 sm:mr-2" />{" "}
          {/* Icon for save action */}
          <span className="hidden sm:inline">Save</span>{" "}
          {/* Label for button, hidden on smaller screens */}
        </button>
        {/* Button to print the current blueprint */}
        <button
          onClick={onPrint} // Trigger print action
          className="flex items-center justify-center sm:justify-start p-2 bg-sky-600 hover:bg-sky-500 rounded sm:w-full transition-all duration-200 ease-in-out"
        >
          <AiOutlinePrinter className="text-2xl mr-0 sm:mr-2" />{" "}
          {/* Icon for print action */}
          <span className="hidden sm:inline">Print</span>{" "}
          {/* Label for button, hidden on smaller screens */}
        </button>
        <hr className="my-4 mb-8 border-gray-700 hidden sm:block" />{" "}
        {/* Horizontal rule, hidden on small screens */}
        {/* Button to add a new stage */}
        <button
          onClick={onAdd} // Trigger add action
          className="flex items-center justify-center sm:justify-start p-2 bg-orange-500 hover:bg-orange-400 rounded sm:w-full transition-all duration-200 ease-in-out"
        >
          <AiOutlinePlus className="text-2xl mr-0 sm:mr-2" />{" "}
          {/* Icon for add action */}
          <span className="hidden sm:inline">Add stage</span>{" "}
          {/* Label for button, hidden on smaller screens */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar; // Export the Navbar component
