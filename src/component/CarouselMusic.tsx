import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "antd";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MusicProperties } from "types/music.types";
import { handleFormatNumber } from "utils";

interface CarouselMusicProps {
  title: string;
  dataCarousel: MusicProperties[];
}
export function CarouselMusic(props: CarouselMusicProps) {
  const { dataCarousel, title } = props;
  console.log({ dataCarousel });
  return (
    <div className="mt-10">
      <h3 className="mb-3 uppercase text-[20px]">{title}</h3>
      <Swiper
        spaceBetween={24}
        slidesPerView={6.2}
        loop={true}
        // centeredSlides={true}

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
        // className="mySwiper"
      >
        {dataCarousel.map((carousel, index) => {
          return (
            <SwiperSlide key={index}>
              <div>
                <img
                  className="rounded-t-lg"
                  src={carousel.image_music}
                  alt=""
                />
              </div>
              {/* content */}
              <div className="bg-[#21212a] h-[120px] px-2 py-3 flex flex-col rounded-b-lg">
                <Tooltip title={carousel.name_music}>
                  <p className="text-white text-[16px] line-clamp-1">
                    {carousel.name_music}
                  </p>
                </Tooltip>
                <p className="mt-2 text-[14px] text-[#1e78e1]">
                  {carousel.name_singer}
                </p>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faEye} />
                  <span className="ml-1 text-[14px]">
                    {handleFormatNumber(carousel.view)} view
                  </span>
                </div>
                <div className="mt-2">
                  <FontAwesomeIcon icon={faHeart} />
                  <span className="ml-1 text-[14px]">
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
