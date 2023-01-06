// tsrdpfc export default
// tsrpfc

import { Header } from "component";
import { Sidebar } from "component/common";
import { ContextApp } from "context";
import * as React from "react";
import { AppContextInterface } from "types";

interface DefaultLayoutProps {
  children: React.ReactElement;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = (props) => {
  const { children } = props;

  const [isToggleMenu, setIsToogleMenu] = React.useState<boolean>(false);
  const handleToggleMenu = (): void => {
    setIsToogleMenu(!isToggleMenu);
  };
  const stateContext = React.useContext(ContextApp);
  if (!stateContext) {
    return null;
  }
  const { themeProject } = stateContext;

  return (
    <div className="min-h-[100vh] bg-bgPrimary relative">
      {/* sidebar */}

      <div
        className={`${
          isToggleMenu ? "w-[240px]" : "w-[0]"
        } fixed z-20 trasition-common overflow-hidden lg:w-[240px] h-full`}
      >
        <Sidebar handleToggleMenu={handleToggleMenu} />
      </div>
      <div className="trasition-common ml-0 lg:ml-[240px] padding-project overflow-hidden">
        <Header handleToggleMenu={handleToggleMenu} />

        <div className="h-full">{children}</div>
      </div>
      {/* overlay when toggle menu at mobile mode */}
      <div
        className={`bg-[#0f0f0f] opacity-90 fixed inset-0 z-[12] ${
          isToggleMenu ? "block" : "hidden"
        }`}
        onClick={() => {
          setIsToogleMenu(false);
        }}
      ></div>
    </div>
  );
};
