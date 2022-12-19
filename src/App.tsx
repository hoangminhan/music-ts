import { useAppDispatch } from "app/store";
import { getListMusicAsyncThunk } from "features/home-page";
import React, { useEffect } from "react";
import "./App.css";
// hello

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getListMusicAsyncThunk({
        typeMusic: "trending",
        params: { _limit: 20 },
      })
    );
  }, [dispatch]);
  return <div className="text-[red]">Hello</div>;
}

export default App;
