export interface ParamsUrl {
  _limit?:number,
  _page?:string,
  _search?:string
}

export interface PaginationList {
  _limit:number,
  _page:number,
  _total:number,
}
export interface ResponseList <T>{
  data: T[],
  pagination:PaginationList
}

