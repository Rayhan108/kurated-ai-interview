"use client";
import { AllImages } from "@/assets/AllImages";
import { Button, ConfigProvider, Drawer, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
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
      icon: <Image src={AllImages.homeIcon} alt="home" />,
      label: (
        <p className="text-base">
          <Link href={"/overview"}>Overview</Link>
        </p>
      ),
    },
    {
      key: "lesson-vault",
      icon: <Image src={AllImages.lessonIcon} alt="home" />,
      label: (
        <p className="text-base">
          <Link href={"/lesson-vault"}>Lesson Vault</Link>
        </p>
      ),
    },
    {
      key: "storybank",
      icon: (
        <Image
          src={AllImages.storyBankIcon}
          alt="storybank"
          className={collapsed ? "h-10 w-10" : "h-8 w-8"}
        />
      ),
      label: (
        <p className="text-base">
          <Link href={"/storybank/matrix"}>Storybank</Link>
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
          className="sticky w-full z-50 top-0 border-b"
        >
          {/* Custom Button for Desktop Trigger */}
          <div className=" flex items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuIcon /> : <MenuIcon />}
              onClick={() => {
                if (isMobile) {
                  toggleDrawer(); // Toggle Drawer on mobile
                } else {
                  setCollapsed(!collapsed); // Toggle Sider on larger screens
                }
              }}
              style={{
                fontSize: "16px",
                width: "80px",
                height: 64,
              }}
            />
            <div className="flex w-full justify-between items-center px-4">
              <Image
                src={AllImages.kuratedAiLogo}
                alt="logo"
                className="lg:w-fit h-fit"
              />
              <div className="px-6">
                <Link href={"/profile"} className="hover:cursor-pointer">
                  <Image
                    src={AllImages.defaultAvatar}
                    alt="logo"
                    className="w-10 h-10 object-cover rounded-full"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Header>

        <Layout>
          {!isMobile ? (
            <div className="fixed top-0 left-0 pt-16 bg-[#f5f6f8] ">
              <Sider
                width={250}
                collapsedWidth={80}
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                  backgroundColor: "#f5f6f8",
                }}
                className="h-screen overflow-y-auto  border-r py-2 font-mulish w-[300px]"
              >
                <Menu
                  mode="inline"
                  className="bg-[#f5f6f8] border-r-0 font-mulish"
                  defaultSelectedKeys={["1"]}
                  items={items}
                  selectedKeys={[current]}
                  onClick={handleClick}
                />
              </Sider>
            </div>
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
          <Layout>
            <Content
              className="p-5 md:p-7 lg:p-10 bg-[#fafafa] font-mulish min-h-[calc(100vh-64px)] overflow-y-auto"
              style={{
                minHeight: 280,
                marginLeft: !isMobile ? (collapsed ? 80 : 250) : 0,
                transition: "margin-left 0.2s ease",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutComponent;
