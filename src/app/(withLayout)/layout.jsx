"use client";
import { AllImages } from "@/assets/AllImages";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Drawer, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineFilterFrames } from "react-icons/md";
import { PiNetworkFill } from "react-icons/pi";
const { Header, Content } = Layout;

const LayoutComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false); // For Sider on larger screens
  const [isMobile, setIsMobile] = useState(false); // To track if the screen is mobile
  const [drawerVisible, setDrawerVisible] = useState(false); // For controlling Drawer visibility
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Change 768 to your desired breakpoint
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pathname = usePathname();

  const [current, setCurrent] = useState(
    pathname === "/" || pathname === "" ? "overview" : pathname.split("/")[1]
  );
  //or simply use const [current, setCurrent] = useState(location.pathname)

  useEffect(() => {
    if (pathname) {
      if (current !== pathname) {
        setCurrent(pathname.split("/")[1]);
      }
    }
  }, [pathname, current]);

  function handleClick(e) {
    setCurrent(e.key);
  }

  const items = [
    {
      key: "overview",
      icon: (
        <GoHomeFill className="text-yellow-400 text-2xl h-full text-center" />
      ),
      label: (
        <p className="text-base">
          <Link href={"/overview"}>Overview</Link>
        </p>
      ),
    },
    {
      key: "framing",
      icon: (
        <MdOutlineFilterFrames className="text-yellow-400 text-2xl items-center h-full text-center" />
      ),
      label: (
        <p className="text-base">
          <Link href={"/framing"}>Framing</Link>
        </p>
      ),
    },
    {
      key: "storylining",
      icon: (
        <PiNetworkFill className="text-yellow-400 text-2xl items-center h-full text-center" />
      ),
      label: (
        <p className="text-base">
          <Link href={"/storylining"}>Storylining</Link>
        </p>
      ),
    },
  ];

  // Toggle the Drawer visibility
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "rgb(232, 233, 234)",
            itemSelectedColor: "rgb(11,24,38)",
          },
        },
      }}
    >
      <NextTopLoader height={3} />
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#f5f6f8",
          }}
          className=" w-full z-50 sticky top-0"
        >
          {/* Custom Button for Desktop Trigger */}
          <div className=" flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                if (isMobile) {
                  toggleDrawer(); // Toggle Drawer on mobile
                } else {
                  setCollapsed(!collapsed); // Toggle Sider on larger screens
                }
              }}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="flex w-full justify-between items-center px-4">
              <Image
                src={AllImages.logoBlack}
                alt="logo"
                className="w-20 lg:w-fit h-fit"
              />
              <div className="px-6">
                <Image
                  src={AllImages.defaultAvatar}
                  alt="logo"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </Header>

        <Layout>
          {!isMobile ? (
            <Sider
              trigger={null}
              collapsible
              collapsed={collapsed}
              style={{
                minHeight: "100vh",
                backgroundColor: "#f5f6f8",
              }}
              className="border-t border-r py-2 font-mulish h-screen"
            >
              <Menu
                mode="inline"
                className=" bg-[#f5f6f8] border-r-0 font-mulish"
                defaultSelectedKeys={["1"]}
                items={items}
                selectedKeys={[current]}
                onClick={handleClick}
              />
            </Sider>
          ) : (
            <Drawer
              placement="left"
              closable={false}
              onClose={toggleDrawer}
              visible={drawerVisible}
              width={250} // Adjust width as needed
              style={{
                backgroundColor: "#f5f6f8",
              }}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={items}
                className="font-mulish border-none bg-[#f5f6f8]"
              />
            </Drawer>
          )}

          <Content
            className="border-t p-5 md:p-7 lg:p-10 bg-[#fafafa] font-mulish"
            style={{
              // margin: "24px 16px",
              // padding: 40,
              minHeight: 280,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutComponent;
