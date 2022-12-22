// tsrdpfc export default
// tsrpfc

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
      <Sidebar />
      <div className="flex-1 px-[59px] overflow-hidden">{children}</div>
    </div>
  );
};
