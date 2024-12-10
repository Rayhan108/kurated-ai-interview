"use client";
import { AllImages } from "@/assets/AllImages";
import { Form, Input, Button, Checkbox, Typography } from "antd"; // Import necessary components
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgotPasswordEmail = () => {
  const route = useRouter();
  const onFinish = (values) => {
    console.log("Success:", values);
    route.push("/verification-code");
  };

  return (
    <div className="bg-gray-100 p-10">
      <Image src={AllImages.logoBlack} alt="logo" className=" lg:h-full h-7" />
      <div className="  h-screen flex items-center -mt-14">
        <div className=" flex flex-col justify-center max-w-xl px-6 py-8 bg-white shadow-xl rounded-lg  mx-auto md:w-[50%]">
          <Form name="login" onFinish={onFinish} layout="vertical">
            {/* Email */}
            <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
              Email
            </Typography.Title>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent  focus:bg-transparent focus:border-yellow-500" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-gray-900 text-white h-12 text-base font-semibold"
                block
              >
                Send Code
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
