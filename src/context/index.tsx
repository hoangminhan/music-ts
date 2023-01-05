import React, { createContext, useEffect, useState } from "react";
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
  const [themeProject, setThemeProject] = useState<string>(
    sessionStorage.getItem("currentTheme") || "Light"
  );
  console.log({ themeProject });
  const [currentModal, setCurrentModal] = useState<string>("");
  // const stateContext: AppContextInterface | null = {
  //   themeProject,
  //   setThemeProject,
  //   currentModal,
  //   setCurrentModal,
  // };
  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html");
    htmlElement[0].setAttribute("data-theme", themeProject);
    sessionStorage.setItem("currentTheme", themeProject);
  }, [themeProject]);

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
