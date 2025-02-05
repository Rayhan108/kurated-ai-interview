import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import { Button, Flex, message } from "antd";
import { Divider } from "antd";
import LinkedInLogin from "./LinkedInLogin";
import { useLoginWithGoogleMutation } from "@/redux/feature/auth/authApi";
const GoogleLinkedInLogin = () => {
  const [loginWithGoogle] = useLoginWithGoogleMutation()
  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle({}).unwrap();
      console.log("Google login response:", res);
    } catch (error) {
      console.log(error);
    }
  };




  return (
    <div className="">
      <h1 className=" font-bold text-3xl mb-7 md:text-start text-center">
        Log in
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Button onClick={handleGoogleLogin} className="flex items-center justify-center gap-4 border py-4 px-10 rounded-md text-sm font-semibold">
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
