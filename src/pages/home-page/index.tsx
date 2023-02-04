import { CarouselMusic, Header, Hero, MusicType } from "component";
import { useHomePage } from "hooks";
import { useEffect, useState } from "react";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const [isLoadingHomePage, setIsLoadingHomePage] = useState(false);
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
    const getData = async () => {
      setIsLoadingHomePage(true);
      try {
        await Promise.all([
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
      } catch (error) {
      } finally {
        setIsLoadingHomePage(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="pt-[80px] w-full">
        <Hero />
      </div>
      {/* trending */}
      <div className="mt-10">
        <CarouselMusic
          title="Trending"
          dataCarousel={listMusic}
          isLoadingHomePage={isLoadingHomePage}
        />
      </div>
      {/* new music */}
      <div className="mt-10">
        <MusicType
          title="Mới phát hành"
          newMusics={newMusics.data}
          isLoadingHomePage={isLoadingHomePage}
        />
      </div>
      {/* list favorite */}
      <div className="mt-10">
        <CarouselMusic
          title="Top yêu thích"
          dataCarousel={listFavorites}
          isLoadingHomePage={isLoadingHomePage}
        />
      </div>
      {/* new music */}
      <div className="mb-[120px] mt-10">
        <MusicType
          title="Top view"
          newMusics={listTopView}
          isLoadingHomePage={isLoadingHomePage}
        />
      </div>
    </>
  );
}
