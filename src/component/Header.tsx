import {
  faBars,
  faCircleUser,
  faClose,
  faGear,
  faSearch,
  faShirt,
  faSpinner,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Empty, message, Popover, Tooltip } from "antd";
import { useAppDispatch } from "app/store";
import { ContextApp } from "context";
import { handleClearResultSearch } from "features/home-page";
import { getAuth, signOut } from "firebase/auth";
import { useHomePage } from "hooks";
import { useContext, useEffect, useState } from "react";
import { FcVip } from "react-icons/fc";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export interface HeaderProps {
  handleToggleMenu: () => void;
}

export function Header(props: HeaderProps) {
  const ContentProfile = (
    <div className="w-[200px] -m-3 p-3">
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
      <div
        className="group text-sidebarText flex gap-x-2 items-center py-2 px-3 hover:bg-[#0000000d] cursor-pointer hover:text-hoverItem"
        onClick={() => {
          const auth = getAuth();
          signOut(auth)
            .then(() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("userInfo");
              setUserInfo(undefined);
              navigate("/");
              message.success("Đăng xuất thành công");
            })
            .catch((error) => {
              message.error("Có lỗi xảy ra");
            });
        }}
      >
        <MdLogout />
        <p className="group-hover:text-hoverItem text-sidebarText">Đăng xuất</p>
      </div>
    </div>
  );
  const {
    setCurrentModal,
    setPropsModal,
    propsModal,
    userInfo,
    setUserInfo,
    currentPlayer,
    setCurrentPlayer,
    setIsPlaying,
  } = useContext(ContextApp);
  const { searchResults, handleSearchMusic } = useHomePage();
  const { handleToggleMenu } = props;
  const navigate = useNavigate();

  const accessToken: string = localStorage.getItem("accessToken") || "";
  const [valueSearch, setValueSearch] = useState<string>();
  const [debouncedValue, setDebouncedValue] = useState(valueSearch);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  /**
   * If the user is logged in, open the upload modal. If the user is not logged in, open the auth modal
   */
  const handleUploadSong = (): void => {
    if (accessToken) {
      setCurrentModal("modal_upload");
      setPropsModal({ width: 500, centered: false });
    } else {
      setCurrentModal("modal_auth");
      setPropsModal({ ...propsModal, width: 500, closable: false });
    }
  };

  /* It's a debounce function. It will wait for 1 second before setting the debouncedValue. */
  useEffect(() => {
    const timer = setTimeout(
      () => {
        console.log({ valueSearch });
        setDebouncedValue(valueSearch);
      },
      valueSearch ? 1000 : 0
    );
    return () => {
      clearTimeout(timer);
    };
  }, [valueSearch]);
  useEffect(() => {
    if (debouncedValue) {
      const getData = async () => {
        setIsLoadingSearch(true);
        await handleSearchMusic({ query: debouncedValue });
        setIsLoadingSearch(false);
      };
      getData();
    } else {
      dispatch(handleClearResultSearch());
    }
  }, [debouncedValue]);

  return (
    <div className="duration-150 transition-all padding-project h-[70px] fixed z-10 bg-bgPrimary left-0 lg:left-[240px] right-0 flex items-center justify-between">
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
      <div className="bg-bgSecond rounded-[20px] h-[40px] flex items-center relative w-[100%] max-w-[440px] z-[99]">
        <button className="absolute left-4">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <div>
          <input
            type="search"
            className="h-[40px] absolute top-0 left-10 right-0 bg-bgSecond border-none outline-none rounded-[20px]"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
            value={valueSearch}
            onChange={(event) => setValueSearch(event.target.value)}
          />
        </div>
        {/* button close */}
        <button
          className={`absolute right-4 ${valueSearch ? "block" : "hidden"}`}
          onClick={() => {
            setValueSearch("");
            setDebouncedValue("");
            dispatch(handleClearResultSearch());
          }}
        >
          {isLoadingSearch ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faClose} />
          )}
        </button>

        {/* results search */}
        {searchResults?.length || debouncedValue ? (
          <div
            className={`
          absolute left-0 right-0 top-12 min-h-[60px] max-h-[300px] z-[99] bg-bgModal rounded-2xl p-4 pb-0  custom-scroll ${
            searchResults?.length ? "overflow-y-scroll" : ""
          }`}
          >
            {searchResults?.length ? (
              <>
                {searchResults.map((song, index) => {
                  return (
                    <div
                      key={song._id}
                      className={`flex items-center gap-x-2 p-2 mb-3 hover:bg-hoverBgItem cursor-pointer
                      ${song._id === currentPlayer?._id ? "bg-hoverBgItem" : ""}
                      `}
                      onClick={() => {
                        setCurrentPlayer(song);
                        sessionStorage.setItem(
                          "currentPlayer",
                          JSON.stringify(song)
                        );
                        setIsPlaying(true);
                      }}
                    >
                      <img
                        src={song.image_music}
                        className="w-[32px] h-[32px] rounded-md"
                        alt=""
                      />
                      <p>{song.name_music}</p>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex justify-center items-center">
                <Empty description={false} imageStyle={{ fontSize: "50px" }} />
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {/* overlay */}

        {searchResults?.length ? (
          <div className="bg-[#0f0f0f] opacity-90 fixed inset-0 top-[70px] z-[90]"></div>
        ) : (
          ""
        )}
      </div>

      {/* action */}
      <div className="flex">
        {/* topic */}
        <Tooltip placement="bottom" title="Chủ đề">
          <div
            className="style-icon-header"
            onClick={() => {
              setCurrentModal("modal_layout");
              // setPropsModal({
              //   ...propsModal,
              //   title: (
              //     <h2 className="text-[24px] text-primaryText">Giao Diện</h2>
              //   ),
              // });
            }}
          >
            <FontAwesomeIcon icon={faShirt} className="text-secondText" />
          </div>
        </Tooltip>
        {/* upload */}
        <Tooltip placement="bottom" title="Tải lên">
          <div
            className="style-icon-header ml-[12px]"
            onClick={() => {
              handleUploadSong();
            }}
          >
            <FontAwesomeIcon icon={faUpload} className="text-secondText" />
          </div>
        </Tooltip>
        {/* setting */}
        <Tooltip placement="bottom" title="Cài đặt">
          <div className="style-icon-header ml-[12px]">
            <FontAwesomeIcon icon={faGear} className="text-secondText" />
          </div>
        </Tooltip>
        {/* profile */}
        {accessToken ? (
          <Popover
            content={ContentProfile}
            trigger="click"
            placement="bottomRight"
            overlayClassName="popover-music-ts"
          >
            <div className="style-icon-header ml-[12px]">
              {userInfo?.photoURL ? (
                <img src={userInfo?.photoURL} alt="" className="rounded-full" />
              ) : (
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className="text-secondText"
                />
              )}
            </div>
          </Popover>
        ) : (
          <div
            className="style-icon-header ml-[12px]"
            onClick={() => {
              setCurrentModal("modal_auth");
              setPropsModal({ ...propsModal, width: 500, closable: false });
            }}
          >
            <FontAwesomeIcon icon={faCircleUser} className="text-secondText" />
          </div>
        )}
      </div>
    </div>
  );
}
