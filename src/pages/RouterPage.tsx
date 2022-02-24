import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { Routes, Route, Link } from "react-router-dom";

import Login from "./Login";
import Cola from "./Cola";
import CreateTicket from "./CreateTicket";
import Desktop from "./Desktop";
import UIContext from "../context/UIContext";

function RouterPage() {
  const { Header, Sider, Content } = Layout;
  const { hiddenMenu } = useContext(UIContext);
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsedWidth={0} breakpoint="md" hidden={hiddenMenu}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/cola">cola</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/create">create ticket</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cola" element={<Cola />} />
            <Route path="/create" element={<CreateTicket />} />
            <Route path="/desktop" element={<Desktop />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default RouterPage;
