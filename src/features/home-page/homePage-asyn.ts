import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiMusic } from "api";
import { ParamsUrl } from "types";
import { ParamsUrlMusic } from "types/music.types";


// get list music
export const getListMusicAsyncThunk = createAsyncThunk("list-music", async (dataParams:ParamsUrlMusic)=>{
  const result = await apiMusic.getListMusic(dataParams)
  return result;

})
// get list favorite
export const getListFavoritesThunk = createAsyncThunk("list-music-favorite", async (dataParams:ParamsUrlMusic)=>{
  const result = await apiMusic.getListMusic(dataParams)
  return result;

})
// top views
export const getListTopViewThunk = createAsyncThunk("list-music-topview", async (dataParams:ParamsUrlMusic)=>{
  const result = await apiMusic.getListMusic(dataParams)
  return result;

})
// get new musics
export const getNewMusicThunk = createAsyncThunk("new-music", async (params:ParamsUrl)=>{
  const result = await apiMusic.getNewMusics(params)
  return result;

})
export const getSearchThunk = createAsyncThunk("search-music", async (params:ParamsUrl)=>{
  const result = await apiMusic.searchMusic(params)
  return result;

})