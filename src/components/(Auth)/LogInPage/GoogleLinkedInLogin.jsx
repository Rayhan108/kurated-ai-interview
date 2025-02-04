import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import { Button, Flex } from "antd";
import { Divider } from "antd";
import LinkedInLogin from "./LinkedInLogin";
const GoogleLinkedInLogin = () => {
  const handleGoogleLogin = () => {
    console.log("google");
  }



  return (
    <div className="">
      <h1 className=" font-bold text-3xl mb-7 md:text-start text-center">
        Log in
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Button onClick={GoogleLinkedInLogin} className="flex items-center justify-center gap-4 border py-4 px-10 rounded-md text-sm font-semibold">
          {" "}
          <Image src={AllImages.googleIcon} alt="google" /> Sign Up with Google
        </Button>
        <LinkedInLogin></LinkedInLogin>
      </div>
      <Divider className="text-gray-500">or continue with</Divider>
    </div>
  );
};

export default GoogleLinkedInLogin;
