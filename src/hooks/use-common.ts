import axios from "axios";
import fileDownload from "js-file-download";

export const useCommon =()=>{
  const downloadSong = (url: string, filename: string) => {
    console.log("download")
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res) => {
        console.log({ res });
        fileDownload(res.data, `${filename}.mp3`);
      });
  };

  return {
    downloadSong
  }

}