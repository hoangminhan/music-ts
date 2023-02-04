import React from "react";
import { MusicProperties } from "types/music.types";
import { Song } from "./common";
import { LoadingSong } from "./LoadingSong";

interface CarouselMusicProps {
  title: string;
  dataCarousel: MusicProperties[];
  isLoadingHomePage: boolean;
}
export function CarouselMusic(props: CarouselMusicProps) {
  const { dataCarousel, title, isLoadingHomePage } = props;

  return (
    <div>
      <h3 className="mb-3 uppercase text-[20px] text-primaryText">{title}</h3>
      {isLoadingHomePage ? (
        <LoadingSong quantityElement={5} isAvatar={false} />
      ) : (
        <Song listSong={dataCarousel} type="home" />
      )}
    </div>
  );
}
