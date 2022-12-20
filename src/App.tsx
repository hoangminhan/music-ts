import { useAppDispatch } from "app/store";
import { getListMusicAsyncThunk } from "features/home-page";
import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "./App.css";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

// hello

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      getListMusicAsyncThunk({
        typeMusic: "trending",
        params: { _limit: 20 },
      })
    );
  }, [dispatch]);

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />),
    getItem("Team", "sub2", <TeamOutlined />),
    getItem("Files", "9", <FileOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return <></>;
}

export default App;
