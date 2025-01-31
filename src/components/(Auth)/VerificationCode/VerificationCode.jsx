"use client";
import { AllImages } from "@/assets/AllImages";
import { Button, message } from "antd";
import Image from "next/image";
import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { useValidateOtpMutation } from "@/redux/feature/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";

const VerificationCode = () => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const [validateOtp] = useValidateOtpMutation()
  const email = searchParams.get("email");
  console.log(email);
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    if (!email) {
      message.error("Email is required");
      return
    }
    try {
      const data = {
        email,
        otp,
      }
      console.log(data);
      const res = await validateOtp(data).unwrap();
      console.log(res);
      message.success("OTP verified successfully");
    } catch (error) {
      message.error(error?.data?.message);
    }
    setOtp("");
    route.push("/reset-password");
  };

  return (
    <div className="bg-gray-100 p-10">
      <Image src={AllImages.blackLogo} alt="logo" className=" lg:h-full h-7" />
      <div className="  h-screen flex items-center -mt-14">
        <div className="flex flex-col justify-center max-w-xl px-6 py-8 bg-white shadow-xl rounded-lg  mx-auto md:w-[50%]">
          <div className="text-gray-700">
            <h1 className="md:text-3xl text-2xl font-semibold ">
              Enter Verification Code
            </h1>
            <p className="font-normal md:text-base text-sm py-2">
              Please check your email address for the one time verification
              code.
            </p>
          </div>
          <div className="flex justify-center items-center ">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="lg:w-5"> </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="md:w-12 md:h-12 h-14 w-10 text-textColor border-2  text-4xl focus:outline-none focus:border-yellow-500 mx-2 rounded-md mb-10"
                />
              )}
            />
          </div>

          <div>
            <button className="md:text-base text-sm text-yellow-500 underline mb-3">
              Resend Code
            </button>
          </div>

          {/* Submit Button */}

          <Button
            onClick={handleVerifyOtp}
            className="bg-gray-900 text-white h-12 text-base font-semibold"
            block
          >
            Verify Code
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
