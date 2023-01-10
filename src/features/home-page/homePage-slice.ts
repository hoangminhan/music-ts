import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationList, ResponseList } from "types";
import { MusicProperties } from "types/music.types";
import { getListFavoritesThunk, getListMusicAsyncThunk, getListTopViewThunk, getNewMusicThunk } from "./homePage-asyn";

export interface HomePageState {
  listMusic: MusicProperties[];
  listFavorites:MusicProperties[]
  listTopView:MusicProperties[]
  newMusics: ResponseList<MusicProperties>;
  isLoadingHomePage: boolean;
  pagination: PaginationList;
}
const initialState: HomePageState = {
  listMusic: [],
  listFavorites:[],
  listTopView:[],
  newMusics: {
    data: [],
    pagination: {},
  },
  isLoadingHomePage: false,
  pagination: {
    _limit: 10,
    _page: 1,
    _total: 1,
  },
};

export const homePageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // get list music base on type
    builder.addCase(getListMusicAsyncThunk.pending, (state) => {
      state.isLoadingHomePage = true;
    });
    builder.addCase(
      getListMusicAsyncThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          pagination: PaginationList;
          data: MusicProperties[];
        }>
      ) => {
        const { pagination, data } = action.payload;
        state.isLoadingHomePage = false;
        state.listMusic = data;
        state.pagination = pagination;
      }
    );
    builder.addCase(getListMusicAsyncThunk.rejected, (state) => {
      state.isLoadingHomePage = false;
    });
    // get new music
    builder.addCase(getNewMusicThunk.pending, (state) => {
      // state.isLoadingHomePage = true;
    });
    builder.addCase(
      getNewMusicThunk.fulfilled,
      (
        state,
        action: PayloadAction<{
          pagination: PaginationList;
          data: MusicProperties[];
        }>
      ) => {
        const { pagination, data } = action.payload;
        // state.isLoadingHomePage = false;
        state.newMusics = {
          data,
          pagination,
        };
      }
    );
    builder.addCase(getNewMusicThunk.rejected, (state) => {
      // state.isLoadingHomePage = false;
    });
    // list favorite
    builder.addCase(getListFavoritesThunk.fulfilled,(state,action: PayloadAction<{
      pagination: PaginationList;
      data: MusicProperties[];
    }>)=>{
      state.listFavorites = action.payload.data
    })
    // top view
    builder.addCase(getListTopViewThunk.fulfilled,(state,action: PayloadAction<{
      pagination: PaginationList;
      data: MusicProperties[];
    }>)=>{
      state.listTopView = action.payload.data
    })
  },
});
export default homePageSlice.reducer;
