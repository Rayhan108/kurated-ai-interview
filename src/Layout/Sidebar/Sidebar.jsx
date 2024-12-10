"use client";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;

const Sidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // To track if the screen is mobile
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      // Check if the screen width is smaller than `md` (768px in Ant Design)
      setIsMobile(window.innerWidth < 768);
    };

    // Initialize on mount
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout>
      <div>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            minHeight: "100vh",
            background: "#001529",
          }}
          breakpoint="md"
          // Only apply collapsedWidth="0" when on mobile (isMobile is true)
          collapsedWidth={isMobile ? "0" : undefined} // Set collapsedWidth="0" only on mobile
        >
          <div className="demo-logo-vertical" />
          <Menu
            // theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            className="mt-10"
            style={{
              marginTop: 80,
            }}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "nav 1",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "nav 2",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "nav 3",
              },
            ]}
          />
        </Sider>
      </div>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
