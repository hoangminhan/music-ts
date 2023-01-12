import {
  faEllipsis,
  faHeart,
  faVolumeHigh,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, Popover, Slider, Tooltip } from "antd";
import { ContextApp } from "context";
import { useContext, useRef, useState } from "react";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { RiPlayListFill } from "react-icons/ri";
import { TbMicrophone2 } from "react-icons/tb";
import { BsDownload, BsPause, BsFillPlayFill } from "react-icons/bs";
import { TfiLoop } from "react-icons/tfi";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { FaRandom } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import ReactPlayer from "react-player";
import { ParamsPlayerMusic } from "types/music.types";
import { DrawerSong } from "./DrawerSong";
import { useFirebase } from "hooks";
export interface IPlayMusicProps {}
const formatTime = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};
export function PlayMusic(props: IPlayMusicProps) {
  const {
    currentPlayer,
    setCurrentPlayer,
    listPlay,
    isPlaying,
    setIsPlaying,
    listFavorited,
    listReccent,
  } = useContext(ContextApp);
  const [actionPlayer, setActionPlayer] = useState<ParamsPlayerMusic>({
    isLoop: false,
    isRandom: false,
    currentVolume: 50,
  });

  const [duration, setDuration] = useState<number>(0);
  const [timePlayed, setTimePlayed] = useState<string>();
  const [currentPlayed, setCurrentPlayed] = useState<number>(0);
  const refPlayer = useRef<any>(null);

  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);
  // 0 is list song and 1 is list listen song recent
  const [typeToggle, setTypeToggle] = useState<number>(0);

  const { handleClickHeart, handleCheckFavorited } = useFirebase();

  const ContentPopover: any = (
    <div>
      {/* playlist */}
      <div className="flex items-center justify-start text-sidebarText">
        <p className="mr-2 text-sidebarText">
          <MdOutlineLibraryAdd />
        </p>
        <p className="text-sidebarText text-[14px]">Thêm vào danh sách phát</p>
      </div>
      {/* mv */}
      <div className="flex items-center justify-start text-sidebarText">
        <p className="mr-2 text-sidebarText">
          <AiOutlinePlaySquare />
        </p>
        <p className="text-sidebarText text-[14px]">Xem MV</p>
      </div>
      {/* download */}
      <div className="flex items-center justify-start text-sidebarText">
        <p className="mr-2 text-sidebarText">
          <BsDownload />
        </p>
        <p className="text-sidebarText text-[14px]">Tải xuống</p>
      </div>
    </div>
  );

  // title drawer

  // get duration of the song
  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // set data when playing
  const handleProgressChange = (data: any) => {
    setTimePlayed(data.playedSeconds.toFixed());
    setCurrentPlayed(data.playedSeconds);
  };

  // 0 laf danh sacch phat va 1 la gan day
  const handleChangeTypeToggle = (type: number): void => {
    setTypeToggle((pre) => {
      return pre !== type ? type : pre;
    });
  };

  const handleChangeSong = (type: string) => {
    const indexCurrent = listPlay?.findIndex(
      (play) => play._id === currentPlayer?._id
    );
    // click next song
    if (indexCurrent !== -1 && indexCurrent !== undefined) {
      if (type === "next") {
        if (listPlay?.length) {
          setCurrentPlayer(listPlay[indexCurrent + 1]);
          sessionStorage.setItem(
            "currentPlayer",
            JSON.stringify(listPlay[indexCurrent + 1])
          );
        }
      } else if (type === "previous") {
        // click back
        if (listPlay?.length) {
          setCurrentPlayer(listPlay[indexCurrent - 1]);
          sessionStorage.setItem(
            "currentPlayer",
            JSON.stringify(listPlay[indexCurrent - 1])
          );
        }
      }
    }
  };

  if (!currentPlayer) return null;
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-bgPlayer z-[21] px-5 border-solid border-t-[1px] border-borderTopPlayer">
        <div className="flex justify-between items-center h-full gap-x-4">
          {/* content song */}
          <div className="flex flex-1 items-center gap-x-4">
            <img
              src={currentPlayer?.image_music}
              alt=""
              className="h-[64px] w-[64px] rounded"
            />
            {/* mame song */}
            <div>
              <p>{currentPlayer?.name_music}</p>
              <p className="text-secondText text-[12px]">
                {currentPlayer?.name_singer}
              </p>
            </div>
            {/* action */}
            {/* handleClickHeart */}
            <div className="flex gap-x-2 items-center">
              <Tooltip
                title={`${
                  handleCheckFavorited(listFavorited, currentPlayer)
                    ? "Xóa khỏi thư viện"
                    : "Thêm vào thư viện"
                }`}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`cursor-pointer hover:scale-125 trasition-common ${
                    handleCheckFavorited(listFavorited, currentPlayer)
                      ? "text-[#b72479]"
                      : "hover:text-[#b72479]"
                  }`}
                  onClick={async () => {
                    await handleClickHeart(listFavorited, currentPlayer);
                  }}
                />
              </Tooltip>
              <Tooltip title="Xem thêm">
                <Popover
                  content={ContentPopover}
                  trigger="click"
                  overlayClassName="popover-music-ts"
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="cursor-pointer hover:scale-125 trasition-common"
                  />
                </Popover>
              </Tooltip>
            </div>
          </div>
          {/* player song */}
          <div className="flex-1">
            <ReactPlayer
              controls={true}
              url={currentPlayer.src_music}
              playing={isPlaying}
              loop={actionPlayer.isLoop}
              width="100%"
              height="100%"
              onDuration={handleDuration}
              onProgress={handleProgressChange}
              ref={refPlayer}
              volume={actionPlayer.currentVolume / 100}
            />
            <div className="flex justify-center pt-2">
              {/* action */}
              <div className="flex gap-x-[32px] items-center">
                <p
                  className="text-[26px] cursor-pointer hover:scale-110 trasition-common"
                  onClick={() => {
                    setActionPlayer((preData) => {
                      return {
                        ...actionPlayer,
                        isRandom: !preData.isRandom,
                      };
                    });
                  }}
                >
                  <Tooltip
                    title={
                      actionPlayer.isRandom
                        ? "Tắt phát ngẫu nhiên"
                        : "Bật phát ngẫu nhiên"
                    }
                  >
                    <FaRandom
                      className={`${
                        actionPlayer.isRandom ? "text-bgButtonPrimary" : ""
                      }`}
                    />
                  </Tooltip>
                </p>
                <p
                  className={`text-[26px] hover:scale-110 trasition-common ${
                    listPlay?.length && currentPlayer._id === listPlay[0]._id
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } `}
                >
                  <RxTrackPrevious
                    onClick={() => {
                      if (
                        listPlay?.length &&
                        currentPlayer._id === listPlay[0]._id
                      ) {
                      } else {
                        handleChangeSong("previous");
                      }
                    }}
                  />
                </p>

                <p
                  className="text-[26px] px-[4px] py-[4px] rounded-full border-[1px] border-solid border-[#fff] flex-center-element cursor-pointer hover:scale-110 trasition-common"
                  onClick={() => {
                    setIsPlaying(!isPlaying);
                  }}
                >
                  {/* play */}
                  {!isPlaying ? <BsFillPlayFill /> : <BsPause />}
                </p>

                <p
                  className={`text-[26px] hover:scale-110 trasition-common ${
                    listPlay?.length &&
                    currentPlayer._id === listPlay[listPlay?.length - 1]._id
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  onClick={() => {
                    if (
                      listPlay?.length &&
                      currentPlayer._id === listPlay[listPlay?.length - 1]._id
                    ) {
                    } else {
                      handleChangeSong("next");
                    }
                  }}
                >
                  <RxTrackNext />
                </p>

                <p
                  className="text-[26px] cursor-pointer hover:scale-110 trasition-common"
                  onClick={() => {
                    setActionPlayer((preData) => {
                      return {
                        ...actionPlayer,
                        isLoop: !preData.isLoop,
                      };
                    });
                  }}
                >
                  <Tooltip
                    title={
                      actionPlayer.isLoop
                        ? "Tắt phát phát lại"
                        : "Bật phát phát lại"
                    }
                  >
                    <TfiLoop
                      className={`${
                        actionPlayer.isLoop ? "text-bgButtonPrimary" : ""
                      }`}
                    />
                  </Tooltip>
                </p>
              </div>
            </div>

            <div className="w-full mt-[8px] relative flex-center-element gap-x-2">
              {/* current titme */}
              <span className="inline-block">
                {timePlayed ? formatTime(+timePlayed) : "00:00"}
              </span>

              <div className="flex-1">
                <Slider
                  min={0}
                  max={duration}
                  onChange={(newValue: number) => {
                    setCurrentPlayed(newValue);
                    setTimePlayed(newValue.toFixed());
                  }}
                  onAfterChange={(newValue) => {
                    refPlayer.current.seekTo(newValue);
                  }}
                  value={currentPlayed}
                />
              </div>

              {/* duration */}
              <span className="inline-block">{currentPlayer.time_format}</span>
            </div>
          </div>
          {/* action song */}
          <div className="flex flex-1 items-center justify-end gap-x-4">
            <p>
              <Tooltip title="Xem MV">
                <AiOutlinePlaySquare className="cursor-pointer hover:scale-125 trasition-common" />
              </Tooltip>
            </p>

            <p>
              <Tooltip title="Xem lời bài hát">
                <TbMicrophone2 className="cursor-pointer hover:scale-125 trasition-common" />
              </Tooltip>
            </p>

            {/* sounds */}
            <div className="flex items-center gap-x-1 w-[100px]">
              {actionPlayer.currentVolume > 0 ? (
                <p>
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </p>
              ) : (
                <p>
                  <FontAwesomeIcon icon={faVolumeXmark} />
                </p>
              )}

              <div className="w-full">
                <Slider
                  tooltip={{ open: false }}
                  handleStyle={{}}
                  className="my-0"
                  min={0}
                  max={100}
                  onChange={(newValue: number) => {
                    setActionPlayer({
                      ...actionPlayer,
                      currentVolume: newValue,
                    });
                  }}
                  value={actionPlayer.currentVolume}
                />
              </div>
            </div>

            <p
              className="w-6 h-[26px] bg-bgButtonPrimary rounded flex-center-element"
              onClick={() => {
                setIsOpenDrawer(true);
              }}
            >
              <Tooltip title="Danh sách phát" placement="topLeft">
                <RiPlayListFill className="cursor-pointer hover:scale-125 trasition-common" />
              </Tooltip>
            </p>
          </div>
        </div>
      </div>

      {/* drawer list play and listen recent */}
      <Drawer
        title={null}
        placement="right"
        closable={false}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        open={isOpenDrawer}
        width={370}
      >
        <div>
          {/* title */}
          <div className="flex justify-center bg-[#ffffff1a] w-[230px] rounded-full p-1 mx-auto my-0">
            <p
              className={`text-[13px] py-[8px] px-[12px] rounded-full cursor-pointer text-secondText hover:text-hoverItem ${
                typeToggle === 0 ? "bg-[#ffffff4d] text-hoverItem" : ""
              }`}
              onClick={() => {
                handleChangeTypeToggle(0);
              }}
            >
              Danh sách phát
            </p>
            <p
              className={`text-[13px] py-[8px] px-[12px] rounded-full cursor-pointer text-secondText hover:text-hoverItem ${
                typeToggle === 1 ? "bg-[#ffffff4d] text-hoverItem" : ""
              }`}
              onClick={() => {
                handleChangeTypeToggle(1);
              }}
            >
              Nghe gần đây
            </p>
          </div>

          {/* content */}
          <div>
            <DrawerSong
              listPlay={typeToggle ? listReccent : listPlay}
              typeToggle={typeToggle}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}
