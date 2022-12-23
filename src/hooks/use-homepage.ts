import { useAppDispatch, useAppSelector } from "app/store";
import { getListMusicAsyncThunk } from "features/home-page";
import { ParamsUrlMusic } from "types/music.types";

export const useHomePage = ()=>{
  const dataHomePage = useAppSelector(state=>state.homePageStore)
  const {listMusic,isLoadingHomePage,pagination} = dataHomePage
  console.log();
  const dispatch = useAppDispatch();
  const handleGetListTrendingMusic = (parameter:ParamsUrlMusic)=>{
    const {typeMusic,params} = parameter
    return  dispatch(
      getListMusicAsyncThunk({
        typeMusic,
        params,
      })
    );
  }

  return {handleGetListTrendingMusic,listMusic,isLoadingHomePage,pagination}
}