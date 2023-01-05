import { Modal } from "antd";
import { THEME_LIGHT, nameModal, THEME_DARK } from "const";
import { ContextApp } from "context";
import * as React from "react";
import { AppContextInterface } from "types";

export interface ModalLayoutProps {
  visible?: boolean;
}

export function ModalLayout(props: ModalLayoutProps) {
  const { themeProject, setThemeProject } = React.useContext(ContextApp);
  const handleChangeDataTheme = (theme: string) => {
    setThemeProject(theme);
  };

  return (
    <div className="modallalsdasd">
      {/* title */}
      <h2>Giao Diện</h2>
      {/* Dark color*/}
      <div>
        <p className="text-black my-4">Tối</p>
        <div className="flex flex-wrap gap-x-4 gap-y-6">
          {THEME_DARK.map((theme, index) => {
            return (
              <div
                key={theme.value}
                onClick={() => {
                  handleChangeDataTheme(theme.value);
                }}
              >
                {/* image */}
                <div className="relative group">
                  <img
                    src={theme.img}
                    alt=""
                    className="w-[125px] h-[85px] rounded-[4px] overflow-hidden"
                  />
                  {/* opacity */}
                  <div className="absolute z-[1] inset-0 bg-[#00000080] invisible group-hover:visible opacity-60"></div>
                  {/* button */}
                  <div className="invisible group-hover:visible trasition-common absolute z-[2] top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[100px]  mb-2 text-center py-[5px] rounded-full bg-[#0000004d] text-white cursor-pointer">
                      <p className="text-[9px] uppercase font-bold">Áp dụng</p>
                    </div>
                    <div className="w-[100px] border-solid border-[1px] border-white text-center py-[5px] rounded-full bg-[#0000004d] cursor-pointer hover:opacity-80">
                      <p className="text-[9px] uppercase font-bold">
                        Xem trước
                      </p>
                    </div>
                  </div>
                </div>
                {/* name color */}
                <p className="text-[13px] text-black">{theme.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* Light color*/}
      <div>
        <p className="text-black my-4">Sáng</p>

        <div className="flex flex-wrap gap-x-4 gap-y-6">
          {THEME_LIGHT.map((theme, index) => {
            return (
              <div key={theme.value}>
                <div>
                  <img
                    src={theme.img}
                    alt=""
                    className="w-[125px] h-[85px] rounded-[4px] overflow-hidden"
                  />
                </div>
                <p className="text-[13px] text-black">{theme.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
