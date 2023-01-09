import { MusicProperties } from "./music.types";

type SetValue = (value: any) => void;
export interface AppContextInterface {
  themeProject: string;
  setThemeProject: (theme: string) => void;
  currentModal: string;
  setCurrentModal: (nameModal: string) => void;
  currentPlayer?: MusicProperties;
  setCurrentPlayer: (music: MusicProperties) => void;
  listPlay?: MusicProperties[];
  setListPlay: (music: MusicProperties[]) => void;
  isPlaying: boolean;
  setIsPlaying: (type: boolean) => void;
}
