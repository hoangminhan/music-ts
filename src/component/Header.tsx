import {
  faBars,
  faCircleUser,
  faGear,
  faSearch,
  faShirt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Tooltip } from "antd";
import { ContextApp } from "context";
import { useContext } from "react";
import { FcVip } from "react-icons/fc";
import { MdLogout } from "react-icons/md";

export interface HeaderProps {
  handleToggleMenu: () => void;
}

export function Header(props: HeaderProps) {
  const ContentProfile = (
    <div className="w-[200px] -m-3 py-3">
      <div className="group text-sidebarText flex gap-x-2 items-center py-2 px-3 hover:bg-[#0000000d] cursor-pointer hover:text-hoverItem">
        <FcVip />
        <p className="group-hover:text-hoverItem text-sidebarText">
          Nâng cấp VIP
        </p>
      </div>
      <div className="group text-sidebarText flex gap-x-2 items-center py-2 px-3 hover:bg-[#0000000d] cursor-pointer hover:text-hoverItem">
        <FcVip />
        <p className="group-hover:text-hoverItem text-sidebarText">
          Mua code VIP
        </p>
      </div>
      <div className="group text-sidebarText flex gap-x-2 items-center py-2 px-3 hover:bg-[#0000000d] cursor-pointer hover:text-hoverItem">
        <MdLogout />
        <p className="group-hover:text-hoverItem text-sidebarText">Đăng xuất</p>
      </div>
    </div>
  );

  const { currentModal, setCurrentModal } = useContext(ContextApp);
  const { handleToggleMenu } = props;

  return (
    <div className="duration-150 transition-all padding-project h-[70px] fixed z-10 bg-bgPrimary left-0 lg:left-[240px] right-0 flex items-center justify-between border-solid border-b-[1px] border-borderLight">
      {/* menu mobile */}
      <div className="mr-2 block lg:hidden">
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => {
            handleToggleMenu();
          }}
        />
      </div>
      {/* search */}
      <div className="bg-bgSecond rounded-[20px] h-[40px] flex items-center relative w-[100%] max-w-[440px] mr-8">
        <button className="absolute left-4">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <div>
          <input
            type="search"
            className="h-[40px] absolute top-0 left-10 right-0 bg-bgSecond border-none outline-none rounded-[20px]"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          />
        </div>
      </div>

      {/* action */}
      <div className="flex">
        {/* topic */}
        <Tooltip title="Chủ đề">
          <div
            className="style-icon-header"
            onClick={() => {
              setCurrentModal("modal_layout");
            }}
          >
            <FontAwesomeIcon icon={faShirt} className="text-secondText" />
          </div>
        </Tooltip>

        {/* upload */}
        <Tooltip title="Tải lên">
          <div className="style-icon-header ml-[12px]">
            <FontAwesomeIcon icon={faUpload} className="text-secondText" />
          </div>
        </Tooltip>

        {/* setting */}
        <Tooltip title="Cài đặt">
          <div className="style-icon-header ml-[12px]">
            <FontAwesomeIcon icon={faGear} className="text-secondText" />
          </div>
        </Tooltip>

        {/* profile */}
        <Popover
          content={ContentProfile}
          trigger="click"
          placement="bottomRight"
          overlayClassName="popover-music-ts"
        >
          <div className="style-icon-header ml-[12px]">
            <FontAwesomeIcon icon={faCircleUser} className="text-secondText" />
          </div>
        </Popover>
      </div>
    </div>
  );
}
