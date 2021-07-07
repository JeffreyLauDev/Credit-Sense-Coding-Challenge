import React, { useState, useContext } from "react";
const UpdateContext = React.createContext();

function UpdateProvider({ children }) {
  const [update, setUpdate] = useState(null);

  const value = [update, setUpdate];
  return (
    <UpdateContext.Provider value={value}>{children}</UpdateContext.Provider>
  );
}

function useUpdate() {
  const update = useContext(UpdateContext);
  if (update === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return update;
}


export { UpdateProvider, useUpdate };
