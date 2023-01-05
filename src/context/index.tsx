import React, { createContext, useState } from "react";
import { AppContextInterface } from "types";
interface propsContext {
  children: React.ReactElement;
}

export const ContextApp = createContext<AppContextInterface>({
  currentModal: "",
  themeProject: "",
  setThemeProject: function (theme: string): void {
    throw new Error("Function not implemented.");
  },
  setCurrentModal: function (nameModal: string): void {
    throw new Error("Function not implemented.");
  },
});

export const UseContextProvider = ({ children }: propsContext) => {
  const [themeProject, setThemeProject] = useState<string>("");
  const [currentModal, setCurrentModal] = useState<string>("");
  // const stateContext: AppContextInterface | null = {
  //   themeProject,
  //   setThemeProject,
  //   currentModal,
  //   setCurrentModal,
  // };

  return (
    <ContextApp.Provider
      value={{
        themeProject,
        setThemeProject,
        currentModal,
        setCurrentModal,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
