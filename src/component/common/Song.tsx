import * as React from "react";
import {
  faEllipsis,
  faEye,
  faHeart,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Tooltip } from "antd";
import { ContextApp } from "context";
import { useCommon, useFirebase, useHomePage } from "hooks";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { BsDownload } from "react-icons/bs";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { handleFormatNumber } from "utils";
import { MusicProperties } from "types/music.types";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper";

export interface ISongProps {
  listSong: MusicProperties[] | undefined;
  type: string;
}

export function Song(props: ISongProps) {
  const { downloadSong } = useCommon();
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
  const { listSong, type } = props;
  const {
    listFavorited,
    isPlaying,
    setIsPlaying,
    currentPlayer,
    setCurrentModal,
    setDataModal,
    setPropsModal,
  } = React.useContext(ContextApp);
  const { handleChangePlayMusic } = useHomePage();

  const { handleCheckFavorited, handleClickHeart } = useFirebase();

  const handleWatchMovie = (data: MusicProperties) => {
    setIsPlaying(false);
    setCurrentModal("modal_mv");

    setDataModal(data);
    setPropsModal({ width: 800 });

    console.log(data);
  };

  if (!listSong) return null;
  return (
    <>
      {type === "favorite" ? (
        <>
          {listSong?.map((song, index) => {
            return (
              <div key={song._id} className="max-w-[200px]">
                <div className="group relative overflow-hidden">
                  <img
                    className="rounded-t-lg group-hover:scale-105 hover:overflow-hidden duration-300 ease-linear cursor-pointer w-[200px] h-[200px]"
                    src={song.image_music}
                    alt=""
                  />

                  {/* action */}
                  <div className="absolute z-[2] top-[50%] left-2 right-2 -translate-y-1/2 flex items-center justify-between invisible group-hover:visible duration-[250ms] ease-linear">
                    {/* heart */}
                    <div className="w-[20px] h-[20px] cursor-pointer">
                      <Tooltip
                        title={`${
                          handleCheckFavorited(listFavorited, song)
                            ? "Xóa khỏi thư viện"
                            : "Thêm vào thư viện"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={`w-[20px] h-[20px] hover:text-[#b72479] ${
                            handleCheckFavorited(listFavorited, song)
                              ? "text-[#b72479]"
                              : ""
                          }`}
                          onClick={async () => {
                            await handleClickHeart(listFavorited, song);
                          }}
                        />
                      </Tooltip>
                    </div>
                    {/* play */}
                    <div
                      className="w-[40px] h-[40px] bg-transparent rounded-full border-[1px] border-solid border-[#fff] flex-center-element cursor-pointer"
                      onClick={async () => {
                        await handleChangePlayMusic(song, listSong, isPlaying);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          currentPlayer?._id === song._id && isPlaying
                            ? faPause
                            : faPlay
                        }
                        className="w-[20px] h-[20px]"
                      />
                    </div>
                    {/* extra action */}
                    <div className="w-[20px] h-[20px] cursor-pointer hover:scale-110 duration-150 ease-linear">
                      <Popover
                        content={
                          <div>
                            {/* playlist */}
                            <div className="group flex items-center justify-start text-sidebarText cursor-pointer px-3 hover:bg-hoverBgItem">
                              <p className="mr-2 group-hover:text-hoverItem text-sidebarText">
                                <MdOutlineLibraryAdd />
                              </p>
                              <p className="group-hover:text-hoverItem text-sidebarText text-[14px]">
                                Thêm vào danh sách phát
                              </p>
                            </div>
                            {/* mv */}
                            <div
                              className="group flex items-center justify-start text-sidebarText cursor-pointer px-3 hover:bg-hoverBgItem"
                              onClick={() => {
                                handleWatchMovie(song);
                              }}
                            >
                              <p className="mr-2 group-hover:text-hoverItem text-sidebarText">
                                <AiOutlinePlaySquare />
                              </p>
                              <p className="group-hover:text-hoverItem text-sidebarText text-[14px]">
                                Xem MV
                              </p>
                            </div>
                            {/* download */}
                            <div
                              className="group flex items-center justify-start text-sidebarText cursor-pointer px-3 hover:bg-hoverBgItem"
                              onClick={() => {
                                downloadSong(song.src_music, song.name_music);
                              }}
                            >
                              <p className="mr-2 group-hover:text-hoverItem text-sidebarText">
                                <BsDownload />
                              </p>
                              <p className="group-hover:text-hoverItem text-sidebarText text-[14px]">
                                Tải xuống
                              </p>
                            </div>
                          </div>
                        }
                        overlayClassName="popover-music-ts"
                      >
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="w-[20px] h-[20px]"
                        />
                      </Popover>
                    </div>
                  </div>
                  {/* opacity */}
                  <div className="absolute z-[1] inset-0 bg-[#00000080] invisible group-hover:visible duration-[250ms] ease-linear"></div>

                  {/* time of the song */}
                  <div className="absolute top-2 right-[6px] px-[4px] py-[2px] bg-[#4a4242] rounded-md flex-center-element">
                    <p className="text-[13px]">{song.time_format}</p>
                  </div>
                </div>

                {/* content */}
                <div className="bg-[#21212a] h-[120px] px-2 py-3 flex flex-col rounded-b-lg">
                  <Tooltip title={song.name_music}>
                    <p className="text-white text-[15px] line-clamp-1 capitalize">
                      {song.name_music}
                    </p>
                  </Tooltip>
                  <p className="mt-2 text-[13px] text-[#1e78e1]">
                    {song.name_singer}
                  </p>
                  <div className="mt-2">
                    <FontAwesomeIcon icon={faEye} />
                    <span className="ml-1 text-[13px]">
                      {handleFormatNumber(song.view)} view
                    </span>
                  </div>
                  <div className="mt-2">
                    <FontAwesomeIcon icon={faHeart} />
                    <span className="ml-1 text-[13px]">
                      {handleFormatNumber(song?.favorite ? song?.favorite : 0)}{" "}
                      song
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <Swiper
          spaceBetween={24}
          slidesPerView={6.2}
          loop={true}
          navigation={false}
          modules={[Pagination, Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 2.2,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 3.2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 4.2,
              spaceBetween: 12,
            },
            1150: {
              slidesPerView: 5.2,
              spaceBetween: 18,
            },
            1500: {
              slidesPerView: 6.2,
              spaceBetween: 24,
            },
          }}
        >
          {listSong.map((song, index) => {
            return (
              <SwiperSlide key={song._id} className="overflow-hidden">
                <div className="group relative overflow-hidden">
                  <img
                    className="rounded-t-lg group-hover:scale-105 group-hover:overflow-hidden duration-300 ease-linear cursor-pointer w-[200px] h-[180px]"
                    src={song.image_music}
                    alt=""
                  />

                  {/* action */}
                  <div className="absolute z-[2] top-[50%] left-2 right-2 -translate-y-1/2 flex items-center justify-between invisible group-hover:visible duration-[250ms] ease-linear">
                    {/* heart */}
                    <div className="w-[20px] h-[20px] cursor-pointer">
                      <Tooltip
                        title={`${
                          handleCheckFavorited(listFavorited, song)
                            ? "Xóa khỏi thư viện"
                            : "Thêm vào thư viện"
                        }`}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={`w-[20px] h-[20px] hover:text-[#b72479] ${
                            handleCheckFavorited(listFavorited, song)
                              ? "text-[#b72479]"
                              : ""
                          }`}
                          onClick={async () => {
                            await handleClickHeart(listFavorited, song);
                          }}
                        />
                      </Tooltip>
                    </div>
                    {/* play */}
                    <div
                      className="w-[40px] h-[40px] bg-transparent rounded-full border-[1px] border-solid border-[#fff] flex-center-element cursor-pointer"
                      onClick={async () => {
                        await handleChangePlayMusic(song, listSong, isPlaying);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          currentPlayer?._id === song._id && isPlaying
                            ? faPause
                            : faPlay
                        }
                        className="w-[20px] h-[20px]"
                      />
                    </div>
                    {/* extra action */}
                    <div className="w-[20px] h-[20px] cursor-pointer hover:scale-110 duration-150 ease-linear">
                      <Popover
                        placement="topRight"
                        content={
                          <div>
                            {/* playlist */}
                            <div className="group flex items-center justify-start text-sidebarText cursor-pointer px-3 hover:bg-hoverBgItem">
                              <p className="mr-2 group-hover:text-hoverItem text-sidebarText">
                                <MdOutlineLibraryAdd />
                              </p>
                              <p className="group-hover:text-hoverItem text-sidebarText text-[14px]">
                                Thêm vào danh sách phát
                              </p>
                            </div>
                            {/* mv */}
                            <div
                              className="group flex items-center justify-start text-sidebarText cursor-pointer px-3 hover:bg-hoverBgItem"
                              onClick={() => {
                                handleWatchMovie(song);
                              }}
                            >
                              <p className="mr-2 group-hover:text-hoverItem text-sidebarText">
                                <AiOutlinePlaySquare />
                              </p>
                              <p className="group-hover:text-hoverItem text-sidebarText text-[14px]">
                                Xem MV
                              </p>
                            </div>
                            {/* download */}
                            <div
                              className="group flex items-center justify-start text-sidebarText cursor-pointer px-3 hover:bg-hoverBgItem"
                              onClick={() => {
                                downloadSong(song.src_music, song.name_music);
                              }}
                            >
                              <p className="mr-2 group-hover:text-hoverItem text-sidebarText">
                                <BsDownload />
                              </p>
                              <p className="group-hover:text-hoverItem text-sidebarText text-[14px]">
                                Tải xuống
                              </p>
                            </div>
                          </div>
                        }
                        overlayClassName="popover-music-ts"
                      >
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="w-[20px] h-[20px]"
                        />
                      </Popover>
                    </div>
                  </div>
                  {/* opacity */}
                  <div className="absolute z-[1] inset-0 bg-[#00000080] invisible group-hover:visible duration-[250ms] ease-linear"></div>

                  {/* time of the song */}
                  <div className="absolute top-2 right-[6px] px-[4px] py-[2px] bg-[#4a4242] rounded-md flex-center-element">
                    <p className="text-[13px]">{song.time_format}</p>
                  </div>
                </div>

                {/* content */}
                <div className="bg-[#21212a] h-[120px] px-2 py-3">
                  <div className="flex flex-col rounded-b-lg">
                    <Tooltip title={song.name_music}>
                      <p className="text-white text-[15px] line-clamp-1 capitalize">
                        {song.name_music}
                      </p>
                    </Tooltip>
                    <Tooltip title={song.name_singer}>
                      <p className="mt-2 text-[13px] text-[#1e78e1] line-clamp-1">
                        {song.name_singer}
                      </p>
                    </Tooltip>
                    <div className="mt-2">
                      <FontAwesomeIcon className="text-[13px]" icon={faEye} />
                      <span className="ml-1 text-[13px]">
                        {handleFormatNumber(song.view)} view
                      </span>
                    </div>
                    <div className="mt-2">
                      <FontAwesomeIcon className="text-[13px]" icon={faHeart} />
                      <span className="ml-1 text-[13px]">
                        {handleFormatNumber(
                          song?.favorite ? song?.favorite : 0
                        )}{" "}
                        song
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}
