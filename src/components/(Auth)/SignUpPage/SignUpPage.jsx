"use client";
import { Form, Input, Button, Checkbox, Typography } from "antd"; // Import necessary components
import { UserAddOutlined } from "@ant-design/icons";
import LogoPart from "./LogoPart";
import PotentialPar from "./PotentialPar";
import GoogleLinkedin from "./GoogleLinkedin";
import Link from "next/link";

const SignUpPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="">
      <div className="flex md:flex-row flex-col ">
        <div className=" md:w-[50%] md:min-h-screen bg-gray-800   lg:p-20 md:p-12 px-12 py-5">
          <LogoPart />
          <div className="hidden md:block">
            <PotentialPar />
          </div>
        </div>
        <div className=" flex flex-col justify-center max-w-3xl px-6 py-8 bg-white rounded-lg  mx-auto md:w-[50%]">
          <GoogleLinkedin />

          <Form name="signup" onFinish={onFinish} layout="vertical">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
                  Full name
                </Typography.Title>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Full name is Required",
                    },
                  ]}
                  name="fullName"
                  className="text-primary-color "
                >
                  <Input className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent  focus:bg-transparent focus:border-yellow-500" />
                </Form.Item>
              </div>

              <div>
                <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
                  Last name
                </Typography.Title>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Last Name is Required",
                    },
                  ]}
                  name="lastName"
                  className="text-primary-color "
                >
                  <Input className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent  focus:bg-transparent focus:border-yellow-500" />
                </Form.Item>
              </div>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
                  Password
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
              </div>

              <div>
                <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
                  Confirm Password
                </Typography.Title>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                  ]}
                  name="confirmPassword"
                  className="text-primary-color "
                >
                  <Input.Password className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent  focus:bg-transparent focus:border-yellow-500" />
                </Form.Item>
              </div>
            </div>

            {/* Terms Checkbox */}
            <Form.Item name="terms" valuePropName="checked">
              <Checkbox className="text-base my-4">
                I agree to the{" "}
                <Link href="/" className="text-yellow-500">
                  Terms of Use{" "}
                </Link>
                and{" "}
                <Link href="/" className="text-yellow-500">
                  Privacy Policy
                </Link>
              </Checkbox>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                htmlType="submit"
                className="bg-gray-900 text-white h-12 text-base font-semibold"
                block
              >
                Get Started Now
              </Button>
            </Form.Item>
          </Form>

          {/* Link to Login Page */}
          <div className="text-center mt-4">
            <span>Already have an account? </span>
            <Link href="/log-in" className="text-yellow-500">
              Log in
            </Link>
          </div>
        </div>
        <div className=" md:w-[50%] min-h-screen bg-gray-800 border border-rose-600 lg:p-20 p-12 md:hidden">
          <PotentialPar />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
