// components/Navbar.js
import React from "react";

const Navbar = ({ onOpen, onSave, onNew, onAdd }) => {
  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white flex flex-col p-4 shadow-lg z-10">
      <h1 className="text-white text-xl mb-6 font-semibold">
        Service Blueprint
      </h1>
      <button
        onClick={onNew}
        className="mb-4 w-full p-2 bg-sky-600 hover:bg-sky-500 rounded"
      >
        New
      </button>
      <button
        onClick={onOpen}
        className="mb-4 w-full p-2 bg-sky-600 hover:bg-sky-500 rounded"
      >
        Open
      </button>
      <button
        onClick={onSave}
        className="mb-4 w-full p-2 bg-sky-600 hover:bg-sky-500 rounded"
      >
        Save
      </button>
      <hr className="my-4 mb-8 border-gray-700" />
      <button
        onClick={onAdd}
        className="w-full p-2 bg-orange-500 hover:bg-orange-400 rounded"
      >
        Add stage
      </button>
    </nav>
  );
};

export default Navbar;
