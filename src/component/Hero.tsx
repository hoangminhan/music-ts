import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper";
import { bannerDefault } from "const";

interface HeroProps {}
export function Hero(props: HeroProps) {
  return (
    <Swiper
      className="mt-10"
      spaceBetween={30}
      slidesPerView={2}
      // effect={"coverflow"}
      // coverflowEffect={{
      //   rotate: 50,
      //   stretch: 0,
      //   depth: 100,
      //   modifier: 1,
      //   slideShadows: true,
      // }}
      loop={true}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      // modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      modules={[Autoplay, Pagination, Navigation]}
      autoHeight={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },

        1200: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      }}
    >
      {bannerDefault.map((banner, index) => {
        return (
          <SwiperSlide key={index}>
            <img
              className="rounded-lg w-full object-cover"
              src={banner}
              alt=""
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
