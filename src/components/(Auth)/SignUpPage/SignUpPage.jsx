"use client";
import { AllImages } from "@/assets/AllImages";
import { MyLoading } from "@/components/shared/common/my-loading";
import { StatusCode } from "@/constants/code.constant";
import {
  useCheckEmailExistenceMutation,
  useLoggedInUserQuery,
  useLogInMutation,
  useSendOtpMutation,
  useSignUpMutation,
} from "@/redux/feature/auth/authApi";
import { Button, Checkbox, Form, Input, message, Typography } from "antd"; // Import necessary components
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpInput from "react-otp-input";
import GoogleLinkedin from "./GoogleLinkedin";
import LogoPart from "./LogoPart";
import PotentialPar from "./PotentialPar";

const SignUpPage = () => {
  const router = useRouter();
  const [openVerification, setOpenVerification] = useState(false);

  const { data, isLoading: isLoadingUser, refetch } = useLoggedInUserQuery();
  const [loginOnsubmit, { isLoading: isLoadingLogin }] = useLogInMutation();
  const [checkEmail, { isLoading: isLoadingEmail }] =
    useCheckEmailExistenceMutation();
  const [sendOtp] = useSendOtpMutation();
  const [signUpSubmit, { isLoading: isLoadingSignUp }] = useSignUpMutation();

  const [otp, setOtp] = useState("");
  const [signUpData, setSignUpData] = useState();

  // console.log("signUpData", signUpData);
  const handleVerifyOtp = () => {
    const dto = {
      firstName: signUpData.firstName,
      lastName: signUpData.lastName,
      email: signUpData.email,
      password: signUpData.password,
      otp: otp,
      role: "N/A",
      location: "N/A",
      company: "N/A",
    };

    signUpSubmit(dto)
      .unwrap()
      .then((res) => {
        if (res.code === StatusCode.OK) {
          loginOnsubmit({
            email: dto.email,
            password: dto.password,
          })
            .unwrap()
            .then((res) => {
              if (res.data.id) {
                refetch();
                router.push("/overview");
              }
            });
          message.success("Signup successfully");
        }
      })
      .catch((error) => {
        message.error(error?.data?.message || "Signup failed");
      });

    setOtp("");
  };

  const onFinish = (values) => {
    checkEmail(values.email)
      .unwrap()
      .then((res) => {
        if (!res.data.result) {
          setOpenVerification(true);
          setSignUpData(values);
          sendOtp(values.email)
            .unwrap()
            .then((res) => {
              if (res.data.otp) {
                message.success("OTP sent to email");
              }
            });
        } else {
          message.error("Email already exist");
        }
      });
  };

  const handleResendOtp = () => {
    sendOtp(signUpData.email)
      .unwrap()
      .then((res) => {
        if (res.data.otp) {
          message.success("OTP sent to email");
        }
      });
  };


  if (isLoadingUser) {
    return <MyLoading />;
  }
  if (data?.code === StatusCode.OK) {
    router.push("/overview");
  }
  return (
    <div className="">
      {!openVerification ? (
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
                    First name
                  </Typography.Title>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: "Full name is Required",
                      },
                    ]}
                    name="firstName"
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
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        validator: (_, value) => {
                          if (!value) {
                            return Promise.reject(
                              "Please input your password!"
                            );
                          }
                          const passwordRegex =
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                          if (!passwordRegex.test(value)) {
                            return Promise.reject(
                              "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    className="text-primary-color"
                  >
                    <Input.Password className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent focus:bg-transparent focus:border-yellow-500" />
                  </Form.Item>
                </div>

                <div>
                  <Typography.Title level={5} style={{ color: "#1A1A1A" }}>
                    Confirm Password
                  </Typography.Title>
                  <Form.Item
                    name="confirmPassword"
                    dependencies={["password"]} // Add dependency to listen to password changes
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.reject(
                              "Please confirm your password!"
                            );
                          }
                          if (value !== getFieldValue("password")) {
                            return Promise.reject("Passwords do not match!");
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                    className="text-primary-color"
                  >
                    <Input.Password className="px-3 text-xl bg-site-color border border-gray-300 text-primary-color hover:bg-transparent focus:bg-transparent focus:border-yellow-500" />
                  </Form.Item>
                </div>
              </div>

              {/* Terms Checkbox */}
              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
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
                  loading={isLoadingEmail}
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
      ) : (
        <div className="bg-gray-100 p-10">
          <Image
            src={AllImages.blackLogo}
            alt="logo"
            className=" lg:h-full h-7"
          />
          <div className="  h-screen flex items-center -mt-14">
            <div className=" flex flex-col justify-center max-w-fit px-6 py-8 bg-white shadow-xl rounded-lg  mx-auto md:w-[50%]">
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
                <button onClick={handleResendOtp} className="md:text-base text-sm text-yellow-500 hover:text-yellow-700 underline mb-3">
                  Resend Code
                </button>
              </div>

              {/* Submit Button */}

              <Button
                onClick={handleVerifyOtp}
                className="bg-gray-900 text-white h-12 text-base font-semibold"
                block
                loading={isLoadingSignUp}
              >
                Verify Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
