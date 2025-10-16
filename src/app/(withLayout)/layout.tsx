"use client";
import { AllImages } from "@/assets/AllImages";
import PricingModal from "@/components/ui/PricingModal";
import { AuthGuard } from "@/Layout/auth-guard";
import { useLogoutMutation } from "@/redux/feature/auth/authApi";
import { useGetActiveSubscribeQuery } from "@/redux/feature/tools/tools-api";
import { LockOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Modal,
  theme,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;

const LayoutComponent = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false); // For Sider on larger screens
  const [isMobile, setIsMobile] = useState(false); // To track if the screen is mobile
  const [drawerVisible, setDrawerVisible] = useState(false); // For controlling Drawer visibility
  const [isLockedModalVisible, setIsLockedModalVisible] = useState(false);

  const handleLockedClick = () => {
    setIsLockedModalVisible(true);
  };

  const closeLockedModal = () => {
    setIsLockedModalVisible(false);
  };

  const { data: activeSubscription } = useGetActiveSubscribeQuery(undefined);
  console.log("active subscription ----------->", activeSubscription);
  const isActive = activeSubscription?.data?.result;
  console.log("is subscription active----------->", isActive?.length);

  const [logout, { isLoading }] = useLogoutMutation(undefined);
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
  const onLogOut = async () => {
    await logout(undefined);
    window.location.reload();
  };
  const profileItems = [
    {
      key: "profile",
      label: (
        <Link href={"/profile"} className="text-gray-500">
          My Profile
        </Link>
      ),
    },
    {
      key: "support",
      label: (
        <Link href={"/support"} className="text-gray-500">
          Help and Support
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <p className="text-gray-500 hover:text-red-500" onClick={onLogOut}>
          {isLoading ? "Loading..." : "Logout"}
        </p>
      ),
    },
  ];

  const items = [
    {
      key: "overview",
      icon: <Image src={AllImages.homeIcon} alt="home" />,
      label: (
        <p className="text-base">
          <Link href={"/overview"}>Overview</Link>
        </p>
      ),
      style: {
        display: "flex",
        gap: "10px",
      },
    },

    // {
    //   key: "lesson-vault",
    //   icon: (
    //     <>
    //       <Image src={AllImages.lessonIcon} alt="home" />
    //       {isActive?.length === 0 && (
    //         <LockOutlined
    //           style={{ marginLeft: 8, color: "#999", cursor: "pointer" }}
    //           onClick={handleLockedClick}
    //         />
    //       )}
    //     </>
    //   ),
    //   label: (
    //     <p className="text-base">
    //       {isActive?.length === 0 ? (
    //         <span className="text-gray-400 cursor-not-allowed">
    //           Lesson Vault
    //         </span>
    //       ) : (
    //         <Link href={"/lesson-vault"}   onClick={handleLockedClick}>Lesson Vault</Link>
    //       )}
    //     </p>
    //   ),
    //   disabled: isActive?.length === 0,
    //   style: { display: "flex", gap: "10px" },
    // },
    // {
    //   key: "storybank",
    //   icon: (
    //     <>
    //       <Image
    //         src={AllImages.storyBankIcon}
    //         alt="storybank"
    //         className={collapsed ? "h-10 w-10" : "h-8 w-5"}
    //       />
    //       {isActive?.length === 0 && (
    //         <LockOutlined
    //           style={{ marginLeft: 8, color: "#999", cursor: "pointer" }}
    //           onClick={handleLockedClick}
    //         />
    //       )}
    //     </>
    //   ),
    //   label: (
    //     <p className="text-base">
    //       {isActive?.length === 0 ? (
    //         <span className="text-gray-400 cursor-not-allowed">Storybank</span>
    //       ) : (
    //         <Link href={"/storybank/story-portfolio?story_type=EXTRACTED"}   onClick={handleLockedClick}>
    //           Storybank
    //         </Link>
    //       )}
    //     </p>
    //   ),
    //   disabled: isActive?.length === 0,
    //   style: { display: "flex", gap: "10px" },
    // },
{
      key: "lesson-vault",
      label: (
        <div
          onClick={() => {
            if (isActive?.length === 0) handleLockedClick();
            else router.push("/lesson-vault");
          }}
          className={`flex items-center gap-2 ${
            isActive?.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:text-orange-500"
          }`}
        >
          <Image src={AllImages.lessonIcon} alt="Lesson Vault" />
          <span className="text-base">Lesson Vault</span>
          {isActive?.length === 0 && (
            <LockOutlined style={{ marginLeft: 8, color: "#999" }} />
          )}
        </div>
      ),
    },
    {
      key: "storybank",
      label: (
        <div
          onClick={() => {
            if (isActive?.length === 0) handleLockedClick();
            else router.push("/storybank/story-portfolio?story_type=EXTRACTED");
          }}
          className={`flex items-center gap-2 ${
            isActive?.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:text-orange-500"
          }`}
        >
          <Image
            src={AllImages.storyBankIcon}
            alt="Storybank"
            className={collapsed ? "h-10 w-10" : "h-8 w-5"}
          />
          <span className="text-base">Storybank</span>
          {isActive?.length === 0 && (
            <LockOutlined style={{ marginLeft: 8, color: "#999" }} />
          )}
        </div>
      ),
    },

  ];

  // Toggle the Drawer visibility
  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  return (
    <AuthGuard>
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
            <div className=" flex items-center h-full">
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
                  padding: "30px",
                  // width: "40px",
                  // height: 64,
                }}
              />
              <div className="flex w-full justify-between items-center px-4">
                <Image
                  src={AllImages.kuratedAiLogo}
                  alt="logo"
                  className=" h-fit"
                />
                <Dropdown menu={{ items: profileItems }}>
                  <div className="p-2">
                    <Image
                      src={AllImages.defaultAvatar}
                      alt="logo"
                      className="w-10 h-10 object-cover rounded-full hover:cursor-pointer"
                    />
                  </div>
                </Dropdown>

                {/* modal */}
                {isLockedModalVisible && (
                  <PricingModal closeLockedModal={closeLockedModal} />
                )}
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
    </AuthGuard>
  );
};

export default LayoutComponent;
