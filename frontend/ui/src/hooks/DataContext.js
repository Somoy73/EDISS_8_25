import React, { createContext, useState, useContext } from "react";

// 1️⃣ Create Context
const DataContext = createContext();

// 2️⃣ Provider Component (Stores Data)
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([
    {
      timestamp: new Date().toISOString(),
      videoUrl: "test",
    },
  ]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// 3️⃣ Custom Hook to Access Context
export const useData = () => useContext(DataContext);
