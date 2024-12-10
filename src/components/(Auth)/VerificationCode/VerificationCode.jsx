"use client";
import { AllImages } from "@/assets/AllImages";
import { Form, Input, Button, Checkbox, Typography } from "antd"; // Import necessary components
import Image from "next/image";
import Link from "next/link";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VerificationCode = () => {
  const route = useRouter();
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    console.log("Received OTP for verification:", otp);
    setOtp("");
    route.push("/reset-password");
  };

  return (
    <div className="bg-gray-100 p-10">
      <Image src={AllImages.logoBlack} alt="logo" className=" lg:h-full h-7" />
      <div className="  h-screen flex items-center -mt-14">
        <div className=" flex flex-col justify-center max-w-xl px-6 py-8 bg-white shadow-xl rounded-lg  mx-auto md:w-[50%]">
          <div className="text-gray-700">
            <h1 className="md:text-3xl text-2xl font-semibold ">
              Enter Verification Code
            </h1>
            <p className="font-normal md:text-base text-sm py-2">
              Please check your email address for the one time verification
              code.
            </p>
          </div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span className="lg:w-10   "> </span>}
            renderInput={(props) => (
              <input
                {...props}
                className="md:w-20 md:h-20 h-14 w-10 text-textColor border-2  text-4xl focus:outline-none focus:border-yellow-500 mx-2 rounded-md mb-10"
              />
            )}
          />
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
