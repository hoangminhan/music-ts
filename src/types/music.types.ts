import { ParamsUrl } from "./common.types"

export interface MusicProperties {
  view:number,
  updateAt:string,
  time_format:string,
  subscribe:string,
  src_music:string,
  slug_subscribe:string,
  slug_name_singer:string,
  slug_name_music:string,
  slug_category:string,
  seconds:number,
  name_singer:string,
  name_music:string,
  link_mv?:string,
  image_music:string,
  id_account:string,
  favorite?:number,
  createdAt:string,
  category:string
  account_favorite?:any[],
  _id:string,
  sum_comment?:number 
}

export interface ParamsUrlMusic {
  typeMusic:string,
  params:ParamsUrl
}

export interface ParamsPlayerMusic {
  isRandom:boolean,
  isLoop:boolean,
  currentVolume:number
}