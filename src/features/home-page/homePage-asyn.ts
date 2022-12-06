import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiMusic } from "api";
import { ParamsUrlMusic } from "types/music.types";


// get list music
export const getListMusicAsyncThunk = createAsyncThunk("listMusic", async (dataParams:ParamsUrlMusic)=>{
  const result = await apiMusic.getListMusic(dataParams)
  console.log(result)
  return result;

})