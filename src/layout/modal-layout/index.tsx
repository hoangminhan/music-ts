import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "antd";
import { THEME_LIGHT, nameModal, THEME_DARK } from "const";
import { ContextApp } from "context";
import * as React from "react";
import { AppContextInterface } from "types";

export interface ModalLayoutProps {
  visible?: boolean;
}

export function ModalLayout(props: ModalLayoutProps) {
  const { themeProject, setThemeProject, setCurrentModal } = React.useContext(
    ContextApp
  );
  const handleChangeDataTheme = (theme: string, type: string) => {
    if (type === "apply") {
      setThemeProject(theme);
      setCurrentModal("");
    } else {
      const htmlElement = document.getElementsByTagName("html");
      htmlElement[0].setAttribute("data-theme", theme);
    }
  };

  return (
    <div className="">
      {/* title */}
      <h2 className="text-[24px] text-primaryText">Giao Diện</h2>
      {/* Dark color*/}
      <div>
        <p className="my-4 text-primaryText text-[18px]">Màu Tối</p>
        <div className="flex flex-wrap gap-x-4 gap-y-6">
          {THEME_DARK.map((theme, index) => {
            return (
              <div key={theme.value}>
                {/* image */}
                <div className="relative group">
                  <img
                    src={theme.img}
                    alt=""
                    className={`w-[125px] h-[85px] rounded-[4px] overflow-hidden ${
                      themeProject === theme.value
                        ? "border-solid border-[1px] border-bgButtonPrimary"
                        : ""
                    }`}
                  />
                  {/* opacity */}
                  <div className="absolute z-[1] inset-0 bg-[#00000080] invisible group-hover:visible opacity-60"></div>
                  {/* button */}
                  <div className="invisible group-hover:visible trasition-common absolute z-[2] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="w-[100px]  mb-2 text-center py-[5px] rounded-full bg-bgButtonPrimary text-white cursor-pointer"
                      onClick={() => {
                        handleChangeDataTheme(theme.value, "apply");
                      }}
                    >
                      <p className="text-[9px] uppercase font-bold">Áp dụng</p>
                    </div>
                    <div
                      className="w-[100px] border-solid border-[1px] border-white text-center py-[5px] rounded-full bg-[#0000004d] cursor-pointer hover:opacity-80"
                      onClick={() => {
                        handleChangeDataTheme(theme.value, "temporary");
                      }}
                    >
                      <p className="text-[9px] uppercase font-bold">
                        Xem trước
                      </p>
                    </div>
                  </div>

                  {/* check */}
                  {themeProject === theme.value && (
                    <div className="absolute right-2 bottom-2 w-[20px] h-[20px] bg-bgButtonPrimary rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  )}
                </div>
                {/* name color */}
                <p className="text-[13px] pt-[5px] text-primaryText">
                  {theme.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Light color*/}
      <div>
        <p className="my-4 text-primaryText text-[18px]">Màu Sáng</p>

        <div className="flex flex-wrap gap-x-4 gap-y-6">
          {THEME_LIGHT.map((theme, index) => {
            return (
              <div key={theme.value}>
                <div className="relative group">
                  <img
                    src={theme.img}
                    alt=""
                    className={`w-[125px] h-[85px] rounded-[4px] overflow-hidden ${
                      themeProject === theme.value
                        ? "border-solid border-[1px] border-bgButtonPrimary"
                        : ""
                    }`}
                  />
                  {/* opacity */}
                  <div className="absolute z-[1] inset-0 bg-[#00000080] invisible group-hover:visible opacity-60"></div>

                  {/* button */}
                  <div className="invisible group-hover:visible trasition-common absolute z-[2] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                    <div
                      className="w-[100px]  mb-2 text-center py-[5px] rounded-full bg-bgButtonPrimary text-white cursor-pointer"
                      onClick={() => {
                        handleChangeDataTheme(theme.value, "apply");
                      }}
                    >
                      <p className="text-[9px] uppercase font-bold">Áp dụng</p>
                    </div>
                    <div
                      className="w-[100px] border-solid border-[1px] border-white text-center py-[5px] rounded-full bg-[#0000004d] cursor-pointer hover:opacity-80"
                      onClick={() => {
                        handleChangeDataTheme(theme.value, "temporary");
                      }}
                    >
                      <p className="text-[9px] uppercase font-bold">
                        Xem trước
                      </p>
                    </div>
                  </div>

                  {/* check */}
                  {themeProject === theme.value && (
                    <div className="absolute right-2 bottom-2 w-[20px] h-[20px] bg-bgButtonPrimary rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                  )}
                </div>
                <p className="text-[13px] pt-[5px] text-primaryText">
                  {theme.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
