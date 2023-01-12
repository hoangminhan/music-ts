import { ContextApp } from "context";
import * as React from "react";
import { MusicType } from "component";

export interface IMuisicListenedProps {}

export default function MuisicListened(props: IMuisicListenedProps) {
  const { listReccent } = React.useContext(ContextApp);
  if (!listReccent?.length) return null;
  return (
    <div className="mt-[100px]">
      <MusicType title="Danh sách nhạc đã nghe" newMusics={listReccent} />
    </div>
  );
}
