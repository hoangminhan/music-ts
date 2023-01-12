import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faCloudArrowUp,
  faHouse,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextApp } from "context";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuSidebar } from "types/menu.types";
const menus: MenuSidebar[] = [
  {
    title: "Home Page",
    icon: faHouse,
    path: "/",
  },
  {
    title: "Đã yêu thích",
    icon: faHeart,
    path: "/favorites",
  },
  {
    title: "Bài hát đã nghe",
    icon: faMusic,
    path: "/listened",
  },
  {
    title: "Đã tải lên",
    icon: faCloudArrowUp,
    path: "/dem2",
  },
];
interface MenuProps {
  handleToggleMenu: () => void;
}

export function Menu(props: MenuProps) {
  // <FontAwesomeIcon icon="fa-regular fa-house" /> ffffff1a
  const location = useLocation();
  const { pathname } = location;
  const accessToken = localStorage.getItem("accessToken") || "";
  const navigate = useNavigate();
  const { setCurrentModal, setPropsModal, propsModal } = React.useContext(
    ContextApp
  );
  const handleNagivation = (path: string) => {
    if (accessToken || path === "/") {
      navigate(path);
    } else {
      setCurrentModal("modal_auth");
      setPropsModal({ ...propsModal, width: 500, closable: false });
    }
  };
  return (
    <nav className="flex-1">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li
              key={menu.path}
              className={`group hover:bg-hoverBgItem transition-common ${
                pathname === menu.path
                  ? "bg-hoverBgItem border-r-[3px] border-solid border-bgButtonPrimary"
                  : ""
              }`}
            >
              {/* <Link to={menu.path}> */}
              <div
                className="flex px-[25px] py-3 text-sidebarText cursor-pointer"
                onClick={() => {
                  handleNagivation(menu.path);
                }}
              >
                {" "}
                <FontAwesomeIcon
                  icon={menu.icon}
                  className={`group-hover:text-hoverItem text-[14px] ${
                    pathname === menu.path ? "text-hoverItem" : ""
                  }`}
                />
                <p
                  className={`flex-1 ml-2 text-[14px] group-hover:text-hoverItem font-[700] text-sidebarText ${
                    pathname === menu.path ? "text-hoverItem" : ""
                  }`}
                >
                  {menu.title}
                </p>
              </div>
              {/* </Link> */}
            </li>
          );
        })}
      </ul>
      {/* devide */}
      <div className="h-[1px] bg-[#524c4c] mt-4"></div>
      {/* playlist */}
      <div className="pl-[25px] my-[16px]">
        <p className="uppercase text-[16px] text-sidebarText">
          Danh sách playlist
        </p>
      </div>

      {/* upgrade vip */}
      <div className="px-2 py-[18px] rounded-lg text-center bg-gradient-to-br from-[#5a4be7] to-[#c86dd7] my-[10px] mx-[20px]">
        <p className="mb-[10px] text-white text-[13px]">
          Nghe nhạc không quảng cáo cùng kho nhạc VIP
        </p>
        <span className="inline-block bg-[#ffdb00] text-black py-[10px] px-[35px] text-[12px] uppercase rounded-xl cursor-pointer hover:bg-[#e5c500]">
          Nâng cấp vip
        </span>
      </div>
    </nav>
  );
}
