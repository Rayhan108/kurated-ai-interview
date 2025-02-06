"use client";
import { AllImages } from "@/assets/AllImages";
import { useResetPasswordApiMutation } from "@/redux/feature/auth/authApi";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ResetPassword = () => {

  const router = useRouter();
  const id = localStorage.getItem("resetPasswordId");
  const otp = localStorage.getItem('otp')
  console.log(id, otp);
  const [resetPasswordApi] = useResetPasswordApiMutation()
  const route = useRouter();

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Password not matched");
      return;
    }
    try {
      const data = {
        body: {
          userId: id,
          otp,
        },
        headers: {
          password: values.confirmPassword,
        },
      };
      const res = await resetPasswordApi(data).unwrap();
      console.log(res);
      route.push("/log-in");
    } catch (error) {
      console.log(error);
      message.error("Failed to reset password");
    }
  };


  return (
    <div className="bg-gray-100 p-10">
      <Image src={AllImages.blackLogo} alt="logo" className=" lg:h-full h-7" />
      <div className="  h-screen flex items-center -mt-14">
        <div className=" flex flex-col justify-center max-w-xl px-6 py-8 bg-white shadow-xl rounded-lg  mx-auto md:w-[50%]">
          <h1 className="md:text-2xl text-xl mb-3 font-semibold text-gray-700">
            Reset Password
          </h1>
          <Form name="login" onFinish={onFinish} layout="vertical">
            {/* Email */}
            <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
              New Password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              name="password"
              className="text-primary-color "
            >
              <Input.Password className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent  focus:bg-transparent focus:border-yellow-500" />
            </Form.Item>

            <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
              Confirm Password
            </Typography.Title>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
              ]}
              name="confirmPassword"
              className="text-primary-color "
            >
              <Input.Password className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent  focus:bg-transparent focus:border-yellow-500" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-gray-900 text-white h-12 text-base font-semibold hover:text-yellow-500"
                block
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
