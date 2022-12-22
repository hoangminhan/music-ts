import { Header, Hero } from "component";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  return (
    <div>
      <Header />
      <div className="pt-[80px]">
        <Hero />
      </div>
    </div>
  );
}
