import {  ReactNode } from 'react';
export interface ParamsUrl {
  _limit?:number,
  _page?:string,
  _search?:string

  [key:string]:any
}

export interface PaginationList {
  _limit?:number,
  _page?:number,
  _total?:number,
}
export interface ResponseList <T>{
  data: T[],
  pagination:PaginationList
}
export interface PropertiesModal {
  width?:number,
  title?:ReactNode,
  closable?:boolean
}
export interface UserInformation {
  displayName:string,
  email:string
  photoURL:string
  user_uid:string,
}

