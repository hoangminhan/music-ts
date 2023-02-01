import React from "react";
import { MusicProperties } from "types/music.types";
import { Song } from "./common";

interface CarouselMusicProps {
  title: string;
  dataCarousel: MusicProperties[];
}
export function CarouselMusic(props: CarouselMusicProps) {
  const { dataCarousel, title } = props;

  return (
    <div>
      <h3 className="mb-3 uppercase text-[20px] text-primaryText">{title}</h3>

      <Song listSong={dataCarousel} type="home" />
    </div>
  );
}
