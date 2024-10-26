// components/navigation/Navbar.js
import React from "react";
import {
  AiOutlineFolderOpen,
  AiOutlineSave,
  AiOutlinePrinter,
  AiOutlinePlus,
  AiOutlineFileAdd,
} from "react-icons/ai";

const Navbar = ({ onOpen, onSave, onPrint, onNew, onAdd }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-lg z-10 fixed top-0 w-full sm:w-64 sm:left-0 sm:top-0 sm:h-screen flex flex-row sm:flex-col items-center sm:items-start">
      {/* Title with truncation */}
      <h1 className="text-xl font-semibold flex-1 truncate pr-4 sm:mb-6">
        Service Blueprint
      </h1>

      {/* Button container */}
      <div className="flex flex-row sm:flex-col sm:w-full space-x-2 sm:space-x-0 sm:space-y-4 sm:mt-0">
        <button
          onClick={onNew}
          className="flex items-center justify-center sm:justify-start p-2 bg-sky-600 hover:bg-sky-500 rounded sm:w-full"
        >
          <AiOutlineFileAdd className="text-2xl mr-0 sm:mr-2" />
          <span className="hidden sm:inline">New</span>
        </button>

        <button
          onClick={onOpen}
          className="flex items-center justify-center sm:justify-start p-2 bg-sky-600 hover:bg-sky-500 rounded sm:w-full"
        >
          <AiOutlineFolderOpen className="text-2xl mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Open</span>
        </button>

        <button
          onClick={onSave}
          className="flex items-center justify-center sm:justify-start p-2 bg-sky-600 hover:bg-sky-500 rounded sm:w-full"
        >
          <AiOutlineSave className="text-2xl mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Save</span>
        </button>

        <button
          onClick={onPrint}
          className="flex items-center justify-center sm:justify-start p-2 bg-sky-600 hover:bg-sky-500 rounded sm:w-full"
        >
          <AiOutlinePrinter className="text-2xl mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Print</span>
        </button>

        <hr className="my-4 mb-8 border-gray-700 hidden sm:block" />
        <button
          onClick={onAdd}
          className="flex items-center justify-center sm:justify-start p-2 bg-orange-500 hover:bg-orange-400 rounded sm:w-full"
        >
          <AiOutlinePlus className="text-2xl mr-0 sm:mr-2" />
          <span className="hidden sm:inline">Add stage</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
