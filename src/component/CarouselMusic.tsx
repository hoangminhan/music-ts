import {
  faEllipsis,
  faEye,
  faHeart,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Tooltip } from "antd";
import React, { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MusicProperties } from "types/music.types";
import { handleFormatNumber } from "utils";

import { BsDownload } from "react-icons/bs";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { ContextApp } from "context";
import { useFirebase, useHomePage } from "hooks";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { dbApp } from "FirebaseMusic";

// content popover
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

interface CarouselMusicProps {
  title: string;
  dataCarousel: MusicProperties[];
}
export function CarouselMusic(props: CarouselMusicProps) {
  const { dataCarousel, title } = props;
  const { isPlaying, currentPlayer, userInfo } = React.useContext(ContextApp);
  const { handleChangePlayMusic } = useHomePage();
  const { handleAddToFavoriteList, handleCheckFavorited } = useFirebase();

  // const handlePlayerMusic = (carousel: MusicProperties) => {
  //   sessionStorage.setItem("currentPlayer", JSON.stringify(carousel));
  //   sessionStorage.setItem("currentPlayList", JSON.stringify(dataCarousel));
  //   setCurrentPlayer(carousel);
  //   setListPlay(dataCarousel);
  //   setIsPlaying(true);
  // };
  const [listFavorited, setListFavorited] = useState<
    MusicProperties[] | undefined
  >();
  React.useEffect(() => {
    if (userInfo) {
      const docRef = doc(dbApp, "users", userInfo?.user_uid);
      onSnapshot(docRef, (listUser) => {
        if (!listUser.data()?.length) {
          setListFavorited(listUser?.data()?.favorites);
          console.log(listUser.data());
        }
      });
    }
  }, [userInfo]);
  return (
    <div className="mt-10">
      <h3 className="mb-3 uppercase text-[20px] text-primaryText">{title}</h3>
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
        {dataCarousel.map((carousel, index) => {
          return (
            <SwiperSlide key={index} className="overflow-hidden">
              <div className="group relative overflow-hidden">
                <img
                  className="rounded-t-lg group-hover:scale-105 hover:overflow-hidden duration-300 ease-linear cursor-pointer"
                  src={carousel.image_music}
                  alt=""
                />

                {/* action */}
                <div className="absolute z-[2] top-[50%] left-2 right-2 -translate-y-1/2 flex items-center justify-between invisible group-hover:visible duration-[250ms] ease-linear">
                  {/* heart */}
                  <div className="w-[20px] h-[20px] cursor-pointer">
                    <Tooltip title="Thêm vào thư viện">
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`w-[20px] h-[20px] hover:text-[#b72479] ${
                          handleCheckFavorited(listFavorited, carousel)
                            ? "text-[#b72479]"
                            : ""
                        }`}
                        onClick={() => {
                          if (userInfo) {
                            handleAddToFavoriteList(
                              "users",
                              userInfo,
                              "favorites",
                              carousel
                            );
                          }
                        }}
                      />
                    </Tooltip>
                  </div>
                  {/* play */}
                  <div
                    className="w-[50px] h-[50px] bg-transparent rounded-full border-[1px] border-solid border-[#fff] flex-center-element cursor-pointer"
                    onClick={() =>
                      handleChangePlayMusic(carousel, dataCarousel, isPlaying)
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        currentPlayer?._id === carousel._id && isPlaying
                          ? faPause
                          : faPlay
                      }
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                  {/* extra action */}
                  <div className="w-[20px] h-[20px] cursor-pointer hover:scale-110 duration-150 ease-linear">
                    <Popover
                      content={ContentPopover}
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
                  <p className="text-[13px]">{carousel.time_format}</p>
                </div>
              </div>

              {/* content */}
              <div className="bg-[#21212a] h-[120px] px-2 py-3 flex flex-col rounded-b-lg">
                <Tooltip title={carousel.name_music}>
                  <p className="text-white text-[15px] line-clamp-1 capitalize">
                    {carousel.name_music}
                  </p>
                </Tooltip>
                <p className="mt-2 text-[13px] text-[#1e78e1]">
                  {carousel.name_singer}
                </p>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faEye} />
                  <span className="ml-1 text-[13px]">
                    {handleFormatNumber(carousel.view)} view
                  </span>
                </div>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="ml-1 text-[13px]">
                    {handleFormatNumber(
                      carousel?.favorite ? carousel?.favorite : 0
                    )}{" "}
                    favorite
                  </span>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
