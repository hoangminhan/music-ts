import React, { createContext, useState } from "react";
interface propsContext {
  children: React.ReactElement;
}
interface AppContextInterface {
  themeProject: [string, React.Dispatch<React.SetStateAction<string>>];
}
interface stateContextInterface {
  themeProject: [string, React.Dispatch<React.SetStateAction<string>>];
}

export const ContextApp = createContext<AppContextInterface | null>(null);

export const UseContextProvider = ({ children }: propsContext) => {
  const [currentTheme, setCurrentTheme] = useState<string>("");
  const stateContext: stateContextInterface = {
    themeProject: [currentTheme, setCurrentTheme],
  };

  return (
    <ContextApp.Provider value={stateContext}>{children}</ContextApp.Provider>
  );
};
