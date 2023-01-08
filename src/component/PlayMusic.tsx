import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Slider, Tooltip } from "antd";
import { ContextApp } from "context";
import { useContext, useState } from "react";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { RiPlayListFill } from "react-icons/ri";
import { TbMicrophone2 } from "react-icons/tb";
import { BsDownload, BsPause, BsFillPlayFill } from "react-icons/bs";
import { TfiLoop } from "react-icons/tfi";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { FaRandom } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import React from "react";
import ReactPlayer from "react-player";
import { ParamsPlayerMusic } from "types/music.types";
export interface IPlayMusicProps {}
const formatTime = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
};
export function PlayMusic(props: IPlayMusicProps) {
  const { currentPlayer } = useContext(ContextApp);
  const [actionPlayer, setActionPlayer] = useState<ParamsPlayerMusic>({
    isLoop: false,
    isRandom: false,
    isPlay: false,
  });
  const [duration, setDuration] = useState<number>(0);
  const [timePlayed, setTimePlayed] = useState<string>();
  const [currentPlayed, setCurrentPlayed] = useState<number>(0);
  // console.log({ currentPlayer });
  // console.log({ timePlayed });

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

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeekChange = (event: any) => {
    console.log(typeof event.target.value);
    setTimePlayed(event.target.value.toFixed());
  };
  const handleOnMouseDown = (e: any) => {
    console.log(e);
  };
  const handleProgressChange = (data: any) => {
    setTimePlayed(data.playedSeconds.toFixed());
    setCurrentPlayed(data.playedSeconds);
  };
  console.log({ currentPlayed });
  return (
    <>
      {currentPlayer ? (
        <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-bgPlayer z-[21] px-5 border-solid border-t-[1px] border-borderTopPlayer">
          <div className="flex justify-between items-center h-full">
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
              <div className="flex gap-x-2 items-center">
                <Tooltip title="Thêm vào thư viện">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="cursor-pointer hover:scale-125 trasition-common"
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
                url={currentPlayer.src_music}
                playing={actionPlayer.isPlay}
                loop={actionPlayer.isLoop}
                width="100%"
                height="100%"
                onDuration={handleDuration}
                onProgress={handleProgressChange}
              />
              <div className="flex justify-center">
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
                  <p className="text-[26px] cursor-pointer hover:scale-110 trasition-common">
                    <RxTrackPrevious />
                  </p>

                  <p
                    className="text-[26px] px-[4px] py-[4px] rounded-full border-[1px] border-solid border-[#fff] flex-center-element cursor-pointer hover:scale-110 trasition-common"
                    onClick={() => {
                      setActionPlayer((preData) => {
                        return {
                          ...actionPlayer,
                          isPlay: !preData.isPlay,
                        };
                      });
                    }}
                  >
                    {/* play */}
                    {actionPlayer.isPlay ? <BsFillPlayFill /> : <BsPause />}
                  </p>

                  <p className="text-[26px] cursor-pointer hover:scale-110 trasition-common">
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
              {duration && (
                <div className="w-full bg-[#ccc]">
                  <Slider
                    min={0}
                    max={duration}
                    onChange={(newValue: number) => {
                      setCurrentPlayed(newValue);
                      setTimePlayed(newValue.toFixed());
                    }}
                    value={currentPlayed}
                  />
                </div>
              )}

              <div className="w-full mt-[16px] relative flex-center-element gap-x-2">
                {/* current titme */}
                <span className="inline-block">
                  {timePlayed ? formatTime(+timePlayed) : "00:00"}
                </span>
                {/* <input
                  type="range"
                  value={timePlayed}
                  className="flex-1"
                  min="0"
                  max={duration}
                  step="any"
                  onMouseDown={handleOnMouseDown}
                  onChange={handleSeekChange}
                /> */}
                <Slider
                  min={0}
                  max={duration}
                  onChange={(newValue: number) => {
                    setCurrentPlayed(newValue);
                  }}
                  value={currentPlayed}
                />

                {/* duration */}
                <span className="inline-block">
                  {currentPlayer.time_format}
                </span>
              </div>
            </div>
            {/* action song */}
            <div className="flex flex-1 items-center justify-end gap-x-4">
              <p>
                <Tooltip title="Xem lời MV">
                  <AiOutlinePlaySquare className="cursor-pointer hover:scale-125 trasition-common" />
                </Tooltip>
              </p>

              <p>
                <Tooltip title="Xem lời bài hát">
                  <TbMicrophone2 className="cursor-pointer hover:scale-125 trasition-common" />
                </Tooltip>
              </p>

              <p className="w-6 h-[26px] bg-bgButtonPrimary rounded flex-center-element">
                <Tooltip title="Danh sách phát" placement="topLeft">
                  <RiPlayListFill className="cursor-pointer hover:scale-125 trasition-common" />
                </Tooltip>
              </p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
