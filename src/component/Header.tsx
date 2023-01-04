import {
  faBars,
  faCircleUser,
  faGear,
  faSearch,
  faShirt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div className="duration-150 transition-all h-[70px] fixed z-[999] bg-[#22354e] left-0 lg:left-[240px] right-0 px-[39px] tablet:px-[49px] xl:px-[59px] flex items-center justify-between">
      {/* menu mobile */}
      <div className="mr-2 block tablet:hidden">
        <FontAwesomeIcon icon={faBars} />
      </div>
      {/* search */}
      <div className="bg-[#354258] rounded-[20px] h-[40px] flex items-center relative w-[100%] max-w-[440px] mr-8">
        <button className="absolute left-4">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <div>
          <input
            type="search"
            className="h-[40px] absolute top-0 left-10 right-0 bg-[#354258] border-none outline-none rounded-[20px]"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          />
        </div>
      </div>

      {/* action */}
      <div className="flex">
        <div className="hover:cursor-pointer hover:scale-110 duration-150 w-[40px] h-[40px] rounded-full bg-[#ffffff1a] flex justify-center items-center">
          <FontAwesomeIcon icon={faShirt} />
        </div>

        <div className="hover:cursor-pointer hover:scale-110 duration-150 w-[40px] h-[40px] rounded-full bg-[#ffffff1a] flex justify-center items-center ml-[12px]">
          <FontAwesomeIcon icon={faUpload} />
        </div>
        <div className="hover:cursor-pointer hover:scale-110 duration-150 w-[40px] h-[40px] rounded-full bg-[#ffffff1a] flex justify-center items-center ml-[12px]">
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div className="hover:cursor-pointer hover:scale-110 duration-150 w-[40px] h-[40px] rounded-full bg-[#ffffff1a] flex justify-center items-center ml-[12px]">
          <FontAwesomeIcon icon={faCircleUser} />
        </div>
      </div>
    </div>
  );
}
