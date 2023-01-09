import React, { createContext, useEffect, useState } from "react";
import { AppContextInterface } from "types";
import { MusicProperties } from "types/music.types";
interface propsContext {
  children: React.ReactElement;
}

export const ContextApp = createContext<AppContextInterface>({
  currentModal: "",
  themeProject: "",
  isPlaying: false,
  setThemeProject: function (theme: string): void {},
  setCurrentModal: function (nameModal: string): void {},
  setCurrentPlayer: function (value: MusicProperties): void {},
  setListPlay: function (value: MusicProperties[]): void {},
  setIsPlaying: function (value: boolean): void {},
});

export const UseContextProvider = ({ children }: propsContext) => {
  const [themeProject, setThemeProject] = useState<string>(
    sessionStorage.getItem("currentTheme") || "Light"
  );
  const [currentModal, setCurrentModal] = useState<string>("");
  const [currentPlayer, setCurrentPlayer] = useState<MusicProperties>();
  // danh sach phat
  const [listPlay, setListPlay] = useState<MusicProperties[]>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // add currentPlayer to session storage
  useEffect(() => {
    const carousel = sessionStorage.getItem("currentPlayer");
    const carouselList = sessionStorage.getItem("currentPlayList");
    if (carousel) {
      setCurrentPlayer(JSON.parse(carousel));
    }
    if (carouselList) {
      setListPlay(JSON.parse(carouselList));
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
        listPlay,
        setListPlay,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
