import { Song } from "component/common";
import { ContextApp } from "context";
import React from "react";

export interface IFavoriteProps {}

export default function FavoritePage(props: IFavoriteProps) {
  // content popover

  const { listFavorited } = React.useContext(ContextApp);

  return (
    <div className="mt-[100px]">
      <h2 className="text-primaryText text-[20px] mb-4">Bài hát đã thích</h2>
      <div className="flex gap-4 ">
        <Song listSong={listFavorited} type="favorite" />
      </div>
    </div>
  );
}
