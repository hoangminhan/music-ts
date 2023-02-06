import { imgSource } from "assets/images";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export interface LogoProps {}

export function Logo(props: LogoProps) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center px-[25px] py-[24px]">
      <img
        className="cursor-pointer"
        src={imgSource.logo}
        alt=""
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
}
