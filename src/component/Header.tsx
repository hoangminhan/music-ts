import {
  faBars,
  faCircleUser,
  faGear,
  faSearch,
  faShirt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextApp } from "context";
import { useContext } from "react";

export interface HeaderProps {
  handleToggleMenu: () => void;
}

export function Header(props: HeaderProps) {
  const { currentModal, setCurrentModal } = useContext(ContextApp);
  const { handleToggleMenu } = props;
  return (
    <div className="duration-150 transition-all padding-project h-[70px] fixed z-10 bg-bgContent left-0 lg:left-[240px] right-0 flex items-center justify-between border-solid border-b-[1px] border-borderLight">
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
      <div className="bg-bgInput rounded-[20px] h-[40px] flex items-center relative w-[100%] max-w-[440px] mr-8">
        <button className="absolute left-4">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <div>
          <input
            type="search"
            className="h-[40px] absolute top-0 left-10 right-0 bg-bgInput border-none outline-none rounded-[20px]"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          />
        </div>
      </div>

      {/* action */}
      <div className="flex">
        <div className="style-icon-header">
          <FontAwesomeIcon
            icon={faShirt}
            onClick={() => {
              setCurrentModal("modal_layout");
            }}
            className="text-secondText"
          />
        </div>

        <div className="style-icon-header ml-[12px]">
          <FontAwesomeIcon icon={faUpload} className="text-secondText" />
        </div>
        <div className="style-icon-header ml-[12px]">
          <FontAwesomeIcon icon={faGear} className="text-secondText" />
        </div>
        <div className="style-icon-header ml-[12px]">
          <FontAwesomeIcon icon={faCircleUser} className="text-secondText" />
        </div>
      </div>
    </div>
  );
}
