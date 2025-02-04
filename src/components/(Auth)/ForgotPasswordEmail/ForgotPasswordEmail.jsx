"use client";
import { AllImages } from "@/assets/AllImages";
import { useForgotPasswordOtpMutation } from "@/redux/feature/auth/authApi";
import { Form, Input, Button, Typography, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ForgotPasswordEmail = () => {
  const [forgotPasswordOtp] = useForgotPasswordOtpMutation()
  const route = useRouter();
  const onFinish = async (values) => {
    const data = { email: values.email }
    try {
      const res = await forgotPasswordOtp(data).unwrap();
      console.log("res", res);
      message.success("OTP sent to email");
      route.push(`/verification-code?email=${encodeURIComponent(values.email)}`);

    } catch (error) {
      console.log(error);
      message.error(error?.data?.message);
    }
  };

  return (
    <div className="bg-gray-100 p-10">
      <Image src={AllImages.blackLogo} alt="logo" className=" lg:h-full h-full" />
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
