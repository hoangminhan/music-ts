// tsrdpfc export default
// tsrpfc

import { Header } from "component";
import { Sidebar } from "component/common";
import * as React from "react";

interface DefaultLayoutProps {
  children: React.ReactElement;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className="h-[100vh] bg-[#162a45] flex">
      {/* sidebar */}
      <div className="overflow-hidden w-[0] lg:w-[240px] duration-150 transition-all h-full">
        <Sidebar />
      </div>
      <div className="flex-1 px-[59px] overflow-hidden">
        <Header />

        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};
