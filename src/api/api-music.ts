import {  ParamsUrl, ResponseList } from "types"
import { MusicProperties, ParamsUrlMusic } from "types/music.types"
import axiosClient from "./axios-client"


export const apiMusic = {
  getListMusic : (dataParams:ParamsUrlMusic) :Promise<ResponseList<MusicProperties>>=>{
    const {typeMusic,params} =dataParams
    const url = `music/${typeMusic}`
    return axiosClient.get(url,{params})
  },
  // new music
  getNewMusics : (params:ParamsUrl) :Promise<ResponseList<MusicProperties>>=>{
    const url = `music/new-music`
    return axiosClient.get(url,{params})
  }

}