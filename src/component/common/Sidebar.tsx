import { Logo } from "component/Logo";
import { Menu } from "component/Menu";
import * as React from "react";

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <div
      className={`overflow-hidden w-[0] lg:w-[240px] duration-150 transition-all bg-[#22354e] border-r-[1px] border-solid border-[#ffffff1a]`}
    >
      <div className="flex flex-col h-[100%]">
        <Logo />
        <Menu />
      </div>
    </div>
  );
}
