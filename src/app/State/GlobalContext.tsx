"use client";
import React, { createContext, useReducer, useContext } from "react";
import { GlobalAction, globalReducer, GlobalState, initialGlobalState } from "./GlobalReducer"; 

type GlobalContextType = {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalStore() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalStore must be used within a GlobalProvider");
  }
  return context;
}
