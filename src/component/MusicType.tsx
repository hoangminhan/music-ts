import {
  faEye,
  faHeart,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextApp } from "context";
import { useHomePage } from "hooks";
import * as React from "react";
import { MusicProperties } from "types/music.types";
import { handleFormatNumber } from "utils";

export interface IMusicTypeProps {
  title: string;
  newMusics: MusicProperties[];
}

export function MusicType(props: IMusicTypeProps) {
  const { newMusics, title } = props;
  const { isPlaying, currentPlayer } = React.useContext(ContextApp);

  const { handleChangePlayMusic } = useHomePage();

  return (
    <div>
      <h2 className="text-[20px] pb-3">{title}</h2>
      {/* content */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xxll:grid-cols-4 gap-x-2">
        {newMusics.map((music, index) => {
          return (
            <div
              key={music._id}
              className={`group flex justify-between items-center p-3 rounded ${
                currentPlayer?._id === music._id
                  ? "bg-bgHoverDrawer"
                  : "hover:bg-bgHoverDrawer"
              }`}
            >
              <div className="flex gap-4 justify-between items-center">
                {/* image */}
                <div
                  className="w-[48px] h-[48px] relative cursor-pointer"
                  onClick={() =>
                    handleChangePlayMusic(music, newMusics, isPlaying)
                  }
                >
                  <img
                    src={music.image_music}
                    alt=""
                    className={`w-full h-full rounded ${
                      currentPlayer?._id === music._id
                        ? "opacity-60"
                        : "opacity-100 group-hover:opacity-60"
                    }`}
                  />
                  {/* play */}
                  <div
                    className={`absolute inset-0 flex-center-element ${
                      currentPlayer?._id === music._id
                        ? "flex"
                        : "hidden group-hover:flex"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={
                        currentPlayer?._id === music._id && isPlaying
                          ? faPause
                          : faPlay
                      }
                      className=""
                    />
                  </div>
                </div>
                {/* info of song */}

                <div className="flex flex-col">
                  <p className="line-clamp-1">{music.name_music}</p>
                  <p className="text-[14px] pt-1 text-bgButtonPrimary">
                    {music.name_singer}
                  </p>
                  <div className="flex gap-x-1 pt-2">
                    <div className="text-[13px] flex items-center gap-x-1 text-secondText group-hover:text-primaryText">
                      <FontAwesomeIcon icon={faEye} />
                      <p className="text-[13px] text-secondText group-hover:text-primaryText">
                        {handleFormatNumber(music.view)} view
                      </p>
                    </div>
                    <div className="text-[13px] flex items-center gap-x-1 text-secondText group-hover:text-primaryText">
                      <FontAwesomeIcon icon={faHeart} />

                      <p className="text-[13px] text-secondText group-hover:text-primaryText">
                        {handleFormatNumber(
                          music.favorite ? music.favorite : 0
                        )}{" "}
                        favorites
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>{music.time_format}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
