import { doc, onSnapshot } from "firebase/firestore";
import { dbApp } from "FirebaseMusic";
import React, { createContext, useEffect, useState } from "react";
import { AppContextInterface, PropertiesModal, UserInformation } from "types";
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
  setPropsModal: function (value: PropertiesModal): void {},
  setUserInfo: function (value: UserInformation | undefined): void {},
  setListFavorited: function (value: MusicProperties[]): void {},
  setListReccent: function (value: MusicProperties[]): void {},
});

export const UseContextProvider = ({ children }: propsContext) => {
  const [themeProject, setThemeProject] = useState<string>(
    sessionStorage.getItem("currentTheme") || "Light"
  );
  const [currentModal, setCurrentModal] = useState<string>("");
  const [propsModal, setPropsModal] = useState<{}>();
  const [currentPlayer, setCurrentPlayer] = useState<MusicProperties>();
  // danh sach phat
  const [listPlay, setListPlay] = useState<MusicProperties[]>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState<UserInformation>();

  const [listFavorited, setListFavorited] = useState<
    MusicProperties[] | undefined
  >();
  const [listReccent, setListReccent] = useState<
    MusicProperties[] | undefined
  >();

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
    const user = localStorage.getItem("userInfo");
    if (user) {
      setUserInfo(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    const htmlElement = document.getElementsByTagName("html");
    htmlElement[0].setAttribute("data-theme", themeProject);
    sessionStorage.setItem("currentTheme", themeProject);
  }, [themeProject]);

  // observe
  React.useEffect(() => {
    if (userInfo) {
      const docRef = doc(dbApp, "users", userInfo?.user_uid);
      onSnapshot(docRef, (listUser) => {
        if (!listUser.data()?.length) {
          setListFavorited(listUser?.data()?.favorites);
          setListReccent(listUser?.data()?.listenRecent);
        }
      });
    }
  }, [userInfo]);

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
        propsModal,
        setPropsModal,
        userInfo,
        setUserInfo,
        listFavorited,
        setListFavorited,
        listReccent,
        setListReccent,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};
