import { Logo } from "component/Logo";
import { Menu } from "component/Menu";
import * as React from "react";

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <div
      className={`bg-[#22354e] border-r-[1px] border-solid border-[#ffffff1a] h-full`}
    >
      <div className="flex flex-col h-[100%]">
        <Logo />
        <Menu />
      </div>
    </div>
  );
}
