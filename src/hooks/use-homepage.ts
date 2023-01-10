import React from "react";
import { useAppDispatch, useAppSelector } from "app/store";
import { ContextApp } from "context";
import { getListFavoritesThunk, getListMusicAsyncThunk,getListTopViewThunk,getNewMusicThunk } from "features/home-page";
import { ParamsUrl } from "types";
import { MusicProperties, ParamsUrlMusic } from "types/music.types";

export const useHomePage = ()=>{
   const { setCurrentPlayer, setListPlay, setIsPlaying ,currentPlayer} = React.useContext(
    ContextApp
  );
  const dataHomePage = useAppSelector(state=>state.homePageStore)
  const {listMusic,isLoadingHomePage,pagination,newMusics,listFavorites,listTopView} = dataHomePage
  const dispatch = useAppDispatch();

  // list trending
  const handleGetListTrendingMusic = (parameter:ParamsUrlMusic)=>{
    const {typeMusic,params} = parameter
    return  dispatch(
      getListMusicAsyncThunk({
        typeMusic,
        params,
      })
    );
  }
  // list favorite
  const handleGetListFavortitesMusic = (parameter:ParamsUrlMusic)=>{
    const {typeMusic,params} = parameter
    return  dispatch(
      getListFavoritesThunk({
        typeMusic,
        params,
      })
    );
  }
  // list top view
  const handleGetListTopViewMusic = (parameter:ParamsUrlMusic)=>{
    const {typeMusic,params} = parameter
    return  dispatch(
      getListTopViewThunk({
        typeMusic,
        params,
      })
    );
  }

  const handleGetNewMusic = (params:ParamsUrl)=>{
    return dispatch(getNewMusicThunk(params))
  }

  // get current song playing
  const handleChangePlayMusic = (carousel: MusicProperties,dataCarousel:MusicProperties[],isPlaying:boolean)=>{
   

    if(isPlaying && currentPlayer?._id===carousel._id){
      setIsPlaying(false);
    }
    else {
      sessionStorage.setItem("currentPlayer", JSON.stringify(carousel));
      sessionStorage.setItem("currentPlayList", JSON.stringify(dataCarousel));
      setCurrentPlayer(carousel);
      setListPlay(dataCarousel);
      setIsPlaying(true);
    }
    
  }

  return {handleGetListTrendingMusic,handleGetNewMusic,handleChangePlayMusic,handleGetListFavortitesMusic,handleGetListTopViewMusic,listMusic,isLoadingHomePage,pagination,newMusics,listFavorites,listTopView}
}