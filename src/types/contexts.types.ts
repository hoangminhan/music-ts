type SetValue = (value: any) => void;
export interface AppContextInterface {
  themeProject:any,
  setThemeProject: (theme: string) => void,
  currentModal:any,
  setCurrentModal: (nameModal: string) => void

}