// context/BlueprintContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import initialBlueprintData from '../public/blueprintExample.json';

const BlueprintContext = createContext();

export const BlueprintProvider = ({ children }) => {
  // Set initial blueprint to an empty array (or your desired initial state)
  const [blueprint, setBlueprint] = useState(initialBlueprintData.blueprint);

  useEffect(() => {
    // Only load data from local storage after the component has mounted (client-side only)
    const savedBlueprint = localStorage.getItem('blueprintData');
    if (savedBlueprint) {
      setBlueprint(JSON.parse(savedBlueprint));
    }
  }, []);

  useEffect(() => {
    // Store blueprint data in local storage whenever it changes
    localStorage.setItem('blueprintData', JSON.stringify(blueprint));
  }, [blueprint]);

  return (
    <BlueprintContext.Provider value={{ blueprint, setBlueprint }}>
      {children}
    </BlueprintContext.Provider>
  );
};

export const useBlueprint = () => useContext(BlueprintContext);
