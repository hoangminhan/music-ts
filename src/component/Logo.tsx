import { imgSource } from "assets/images";
import * as React from "react";

export interface LogoProps {}

export function Logo(props: LogoProps) {
  return (
    <div className="flex justify-center px-[25px] py-[24px]">
      <img className="w-[120px] h-[40px]" src={imgSource.logo} alt="" />
    </div>
  );
}
