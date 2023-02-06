import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logo } from "component/Logo";
import { Menu } from "component/Menu";

export interface SidebarProps {
  handleToggleMenu: () => void;
}

export function Sidebar(props: SidebarProps) {
  const { handleToggleMenu } = props;

  return (
    <div
      // className={`bg-[#22354e] border-r-[1px] border-solid border-[#ffffff1a] h-full`}
      className={`bg-bgSidebar border-r-[1px] border-solid border-[#ffffff1a] h-full`}
    >
      <div className="flex flex-col h-full">
        <Logo />
        <Menu handleToggleMenu={handleToggleMenu} />
        <div className="absolute top-3 right-3 visible lg:hidden">
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => {
              handleToggleMenu();
            }}
          />
        </div>
      </div>
    </div>
  );
}
