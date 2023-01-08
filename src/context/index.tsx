import React, { createContext, useEffect, useState } from "react";
import { AppContextInterface } from "types";
import { MusicProperties } from "types/music.types";
interface propsContext {
  children: React.ReactElement;
}

export const ContextApp = createContext<AppContextInterface>({
  currentModal: "",
  themeProject: "",
  setThemeProject: function (theme: string): void {},
  setCurrentModal: function (nameModal: string): void {},
  setCurrentPlayer: function (value: MusicProperties): void {},
});

export const UseContextProvider = ({ children }: propsContext) => {
  const [themeProject, setThemeProject] = useState<string>(
    sessionStorage.getItem("currentTheme") || "Light"
  );
  const [currentModal, setCurrentModal] = useState<string>("");

  const [currentPlayer, setCurrentPlayer] = useState<MusicProperties>();
  console.log({ currentPlayer });

  // add currentPlayer to session storage
  useEffect(() => {
    const carousel = sessionStorage.getItem("currentPlayer");
    if (carousel) {
      setCurrentPlayer(JSON.parse(carousel));
    }
  }, []);
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
        currentPlayer,
        setCurrentPlayer,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
