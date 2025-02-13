import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import { Button, Flex } from "antd";
import { Divider } from "antd";

const GoogleLinkedin = () => {
  return (
    <div>
      <h1 className="text-yellow-500 font-semibold text-2xl mb-10 md:text-start text-center">
        Begin your Journey!
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Button className="flex items-center justify-center gap-4 border py-4 px-10 rounded-md text-sm font-semibold">
          {" "}
          <Image src={AllImages.googleIcon} alt="google" /> Sign Up with Google
        </Button>
        <Button className="flex items-center justify-center gap-4 border py-4 px-9 rounded-md text-sm font-semibold">
          {" "}
          <Image src={AllImages.linkedinIcon} alt="linkedin" /> Sign Up with
          Linkedin
        </Button>
      </div>
      <Divider className="text-gray-500">or continue with</Divider>
    </div>
  );
};

export default GoogleLinkedin;
