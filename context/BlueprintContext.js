import { createContext, useContext, useEffect, useState } from "react";
import initialBlueprintData from "../public/blueprintExample.json";

const BlueprintContext = createContext();

export const BlueprintProvider = ({ children }) => {
  // Ensure that the initial blueprint includes unique ids if not already present
  const [blueprint, setBlueprint] = useState(() => {
    const blueprintWithIds = initialBlueprintData.blueprint.map(
      (stage, index) => ({
        ...stage,
        id: stage.id || Date.now() + index, // Assign a unique ID if not present
      })
    );
    return blueprintWithIds;
  });

  useEffect(() => {
    // Only load data from local storage after the component has mounted (client-side only)
    const savedBlueprint = localStorage.getItem("blueprintData");
    if (savedBlueprint) {
      const parsedBlueprint = JSON.parse(savedBlueprint).map(
        (stage, index) => ({
          ...stage,
          id: stage.id || Date.now() + index, // Ensure that loaded stages also have unique ids
        })
      );
      setBlueprint(parsedBlueprint);
    }
  }, []);

  useEffect(() => {
    // Store blueprint data in local storage whenever it changes
    localStorage.setItem("blueprintData", JSON.stringify(blueprint));
  }, [blueprint]);

  return (
    <BlueprintContext.Provider value={{ blueprint, setBlueprint }}>
      {children}
    </BlueprintContext.Provider>
  );
};

export const useBlueprint = () => useContext(BlueprintContext);
