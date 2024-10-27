import { createContext, useContext, useEffect, useState } from "react"; // Import necessary hooks and functions from React
import initialBlueprintData from "../public/blueprintExample.json"; // Import initial blueprint data from a JSON file

// Create a Context for managing blueprint state
const BlueprintContext = createContext();

// BlueprintProvider component to wrap around children components
export const BlueprintProvider = ({ children }) => {
  // State to hold the blueprint data, initialized with unique IDs if not present
  const [blueprint, setBlueprint] = useState(() => {
    const blueprintWithIds = initialBlueprintData.blueprint.map(
      (stage, index) => ({
        ...stage,
        id: stage.id || Date.now() + index, // Assign a unique ID if not present
      })
    );
    return blueprintWithIds; // Return the modified blueprint data
  });

  useEffect(() => {
    // Load saved blueprint data from local storage after the component has mounted (client-side only)
    const savedBlueprint = localStorage.getItem("blueprintData");
    if (savedBlueprint) {
      const parsedBlueprint = JSON.parse(savedBlueprint).map(
        (stage, index) => ({
          ...stage,
          id: stage.id || Date.now() + index, // Ensure that loaded stages also have unique IDs
        })
      );
      setBlueprint(parsedBlueprint); // Update blueprint state with loaded data
    }
  }, []);

  useEffect(() => {
    // Store blueprint data in local storage whenever it changes
    localStorage.setItem("blueprintData", JSON.stringify(blueprint)); // Save the current blueprint state as a JSON string
  }, [blueprint]); // Dependency array: effect runs whenever 'blueprint' changes

  return (
    <BlueprintContext.Provider value={{ blueprint, setBlueprint }}>
      {children}{" "}
      {/* Render children components with access to the BlueprintContext */}
    </BlueprintContext.Provider>
  );
};

// Custom hook to use the BlueprintContext in other components
export const useBlueprint = () => useContext(BlueprintContext);
