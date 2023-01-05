import { CarouselMusic, Header, Hero } from "component";
import { useHomePage } from "hooks";
import { useEffect } from "react";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const { handleGetListTrendingMusic, listMusic } = useHomePage();
  useEffect(() => {
    handleGetListTrendingMusic({
      typeMusic: "trending",
      params: { _limit: 30 },
    });
  }, []);
  return (
    <>
      <div className="pt-[80px] w-full">
        <Hero />
      </div>
      {/* trending */}
      <div>
        <CarouselMusic title="Trending" dataCarousel={listMusic} />
        {/* <CarouselMusic title="Trending" dataCarousel={listMusic} /> */}
      </div>
    </>
  );
}
