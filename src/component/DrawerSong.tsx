import {
  faEllipsis,
  faHeart,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Empty, Tooltip } from "antd";
import { ContextApp } from "context";
import { useFirebase, useHomePage } from "hooks";
import * as React from "react";
import { MusicProperties } from "types/music.types";

export interface IDrawerSongProps {
  listPlay?: MusicProperties[];
  typeToggle: number;
}
export function DrawerSong(props: IDrawerSongProps) {
  const { listPlay, typeToggle } = props;
  const {
    currentPlayer,
    setCurrentPlayer,
    isPlaying,
    setIsPlaying,
    listFavorited,
  } = React.useContext(ContextApp);

  const { handleCheckFavorited, handleClickHeart } = useFirebase();
  const { handleChangePlayMusic } = useHomePage();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.querySelector("#id-song-current");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 1000);
    return () => clearTimeout(timer);
  }, [typeToggle]);

  if (!currentPlayer) return null;

  return (
    <div>
      {listPlay?.length ? (
        <ul>
          {listPlay?.map((play, index) => {
            return (
              <li
                id={`${
                  play._id === currentPlayer?._id ? "id-song-current" : ""
                }`}
                key={play._id}
                className={`group flex gap-x-[16px] justify-between items-center py-2 px-1 mt-4 rounded ${
                  currentPlayer?._id === play._id
                    ? "bg-bgButtonPrimary"
                    : "hover:bg-bgHoverDrawer"
                }`}
              >
                <div className="flex gap-x-[10px] items-center">
                  <div
                    className="group w-[48px] h-[48px] rounded-md overflow-hidden relative cursor-pointer"
                    onClick={async () => {
                      await handleChangePlayMusic(play, listPlay, isPlaying);
                      // if (isPlaying && currentPlayer?._id === play._id) {
                      //   setIsPlaying(!isPlaying);
                      // } else {
                      //   setIsPlaying(true);
                      // }
                      // setCurrentPlayer(play);
                      // sessionStorage.setItem(
                      //   "currentPlayer",
                      //   JSON.stringify(play)
                      // );
                    }}
                  >
                    <img
                      src={play.image_music}
                      alt=""
                      className="group-hover:opacity-60 h-full w-full object-cover"
                    />
                    {/* play */}
                    <div className="absolute inset-0 flex-center-element hidden group-hover:flex">
                      <FontAwesomeIcon
                        icon={
                          isPlaying && currentPlayer?._id === play._id
                            ? faPause
                            : faPlay
                        }
                        className=""
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-primaryText text-[14px] line-clamp-1">
                      {play.name_music}
                    </p>
                    <p className="text-[12px] pt-1">{play.name_singer}</p>
                  </div>
                </div>
                {/* action */}
                <div className="flex gap-x-4">
                  <div
                    className={`gap-x-2 items-center ${
                      currentPlayer?._id === play._id
                        ? "flex"
                        : "hidden group-hover:flex"
                    }`}
                  >
                    <p className="cursor-pointer">
                      <Tooltip
                        title={`${
                          handleCheckFavorited(listFavorited, play)
                            ? "Xóa khỏi thư viện"
                            : "Thêm vào thư viện"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={`w-[20px] h-[20px] hover:text-[#b72479] ${
                            handleCheckFavorited(listFavorited, play)
                              ? "text-[#b72479]"
                              : ""
                          }`}
                          onClick={async () => {
                            await handleClickHeart(listFavorited, play);
                          }}
                        />
                      </Tooltip>
                    </p>

                    <p className="cursor-pointer">
                      <Tooltip title="Xem thêm">
                        <FontAwesomeIcon icon={faEllipsis} />
                      </Tooltip>
                    </p>
                  </div>
                  <p>{play.time_format}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <Empty />
        </div>
      )}
    </div>
  );
}
