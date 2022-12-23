import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationList, ResponseList } from "types";
import { MusicProperties } from "types/music.types";
import { getListMusicAsyncThunk } from "./homePage-asyn";

export interface HomePageState {
  listMusic: MusicProperties[];
  isLoadingHomePage: boolean;
  pagination: PaginationList;
}
const initialState: HomePageState = {
  listMusic: [],
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
    builder.addCase(getListMusicAsyncThunk.fulfilled, (state, action:PayloadAction<{pagination:PaginationList,data:MusicProperties[]}>) => {
      const { pagination, data } = action.payload
      ;
      state.isLoadingHomePage = false;
      state.listMusic = data;
      state.pagination = pagination;
    });
    builder.addCase(getListMusicAsyncThunk.rejected, (state) => {
      state.isLoadingHomePage = false;
    });
  },
});
export default homePageSlice.reducer;
