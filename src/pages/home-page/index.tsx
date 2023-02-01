import { CarouselMusic, Header, Hero, MusicType } from "component";
import { useHomePage } from "hooks";
import { useEffect } from "react";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const {
    handleGetListTrendingMusic,
    handleGetNewMusic,
    handleGetListFavortitesMusic,
    handleGetListTopViewMusic,
    listMusic,
    newMusics,
    listFavorites,
    listTopView,
  } = useHomePage();
  useEffect(() => {
    Promise.all([
      handleGetListTrendingMusic({
        typeMusic: "trending",
        params: { _limit: 30 },
      }),
      handleGetNewMusic({ _limit: 20 }),
      handleGetListFavortitesMusic({
        typeMusic: "favorite",
        params: { _limit: 30 },
      }),
      handleGetListTopViewMusic({
        typeMusic: "top-views",
        params: { _type: "million" },
      }),
    ]);
  }, []);
  return (
    <>
      <div className="pt-[80px] w-full">
        <Hero />
      </div>
      {/* trending */}
      <div className="mt-10">
        <CarouselMusic title="Trending" dataCarousel={listMusic} />
      </div>
      {/* new music */}
      <div className="mt-10">
        <MusicType title="Mới phát hành" newMusics={newMusics.data} />
      </div>
      {/* list favorite */}
      <div className="mt-10">
        <CarouselMusic title="Top yêu thích" dataCarousel={listFavorites} />
      </div>
      {/* new music */}
      <div className="mb-[120px] mt-10">
        <MusicType title="Top view" newMusics={listTopView} />
      </div>
    </>
  );
}
