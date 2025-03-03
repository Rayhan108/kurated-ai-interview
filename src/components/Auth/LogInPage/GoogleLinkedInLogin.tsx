import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import { Button, Flex, message } from "antd";
import { Divider } from "antd";
import LinkedInLogin from "./LinkedInLogin";
import { useLoginWithGoogleMutation } from "@/redux/feature/auth/authApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoogleLinkedInLogin = () => {
  const [loginWithGoogle] = useLoginWithGoogleMutation();

  const router = useRouter();

  const handleCallbackResponse = (res) => {
    // console.log("inside callback response",res)
    const token = res?.credential;
    // console.log("Encoded JWT ID token: ", res.credential);
    loginWithGoogle(token)
      .then((response) => {
        // console.log("login response",response)
        localStorage.setItem("user", JSON.stringify(response?.data?.data?.id));
        router.push("/overview");
        toast.success("Successfully Logged in 😉😁");
      })
      .catch((err) => {
        // console.log(err);
        toast.error("Error. Please try again.");
      });
  };
  useEffect(() => {
    // Load Google Script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // console.log("Google script loaded");
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCallbackResponse,
        });

        (window as any).google.accounts.id.renderButton(
          document.getElementById("signInDiv"),
          { theme: "outline", size: "large" }
        );
      } else {
        toast.error("Google script failed to load");
      }
    };

    document.body.appendChild(script);

    // Cleanup function (only removes script on unmount)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="">
      <h1 className=" font-bold text-3xl mb-7 md:text-start text-center">
        Log in
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div id="signInDiv">
          <Button className="flex items-center justify-center gap-4 border py-4 px-10 rounded-md text-sm font-semibold">
            {" "}
            <Image src={AllImages.googleIcon} alt="google" /> Sign Up with
            Google
          </Button>
        </div>
        <LinkedInLogin></LinkedInLogin>
      </div>
      <Divider className="text-gray-500">or continue with</Divider>
    </div>
  );
};

export default GoogleLinkedInLogin;
