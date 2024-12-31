"use client";
import { Avatar, Button, Form, Input, Typography, Upload } from "antd";
import { Camera } from "lucide-react";
import { useState } from "react";
export const PersonalDetails = () => {
  const [profilePic, setProfilePic] = useState(null);

  const handleProfilePicUpload = (e) => {
    setProfilePic(e.file.originFileObj);
  };

  const uploadImage = () => {
    // if (!profilePic) {
    //     message.warning("Please select a profile picture first.");
    //     return;
    // }
    // formData.append("image", profilePic);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div>
        <div className="relative w-fit mx-auto">
          <Avatar
            size={120}
            src={profilePic && URL.createObjectURL(profilePic)}
            className="border-4 shadow-xl border-white"
          />
          <Upload
            showUploadList={false}
            onChange={handleProfilePicUpload}
            className="absolute bottom-2 right-2 bg-primaryColor rounded-full cursor-pointer p-0.5"
          >
            <Camera className="w-7 h-7 text-white px-1 -mb-1" />
          </Upload>
        </div>
        {/* <div className="text-center mt-5">
          {profilePic && (
            <button
              onClick={uploadImage}
              className="font-bold bg-primaryColor text-white p-2 px-10 py-2 rounded-md shadow-lg"
              type="button"
            >
              Update Profile Picture
            </button>
          )}
        </div> */}
        <div className="mt-10">
          <Form
            //   form={form} // Bind the form instance
            name="personalDetails"
            initialValues={{}} // Leave this empty to avoid stale initial values
            onFinish={onFinish}
            layout="vertical"
            className="w-full"
          >
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Typography.Title
                  level={5}
                  style={{ color: "#1A1A1A" }}
                  className="font-mulish"
                >
                  First Name
                </Typography.Title>
                <Form.Item
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter first name",
                    },
                  ]}
                  className="m-0"
                >
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="bg-gray-100 border-none p-2"
                    defaultValue="John"
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title
                  level={5}
                  style={{ color: "#1A1A1A" }}
                  className="font-mulish"
                >
                  Last Name
                </Typography.Title>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter last name",
                    },
                  ]}
                  className="m-0"
                >
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="bg-gray-100 border-none p-2"
                    defaultValue="doe"
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title
                  level={5}
                  style={{ color: "#1A1A1A" }}
                  className="font-mulish"
                >
                  Email
                </Typography.Title>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                  ]}
                  className="m-0"
                >
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="bg-gray-100 border-none p-2"
                    defaultValue={"abc@mail.com"}
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title
                  level={5}
                  style={{ color: "#1A1A1A" }}
                  className="font-mulish"
                >
                  Age
                </Typography.Title>
                <Form.Item
                  name="age"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your age",
                    },
                  ]}
                  className="m-0"
                >
                  <Input
                    type="number"
                    placeholder="Type here"
                    className="bg-gray-100 border-none p-2"
                    defaultValue={21}
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title
                  level={5}
                  style={{ color: "#1A1A1A" }}
                  className="font-mulish"
                >
                  University / Company
                </Typography.Title>
                <Form.Item
                  name="universityOrCompany"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your university or company",
                    },
                  ]}
                  className="m-0"
                >
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="bg-gray-100 border-none p-2"
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title
                  level={5}
                  style={{ color: "#1A1A1A" }}
                  className="font-mulish"
                >
                  Intended Role
                </Typography.Title>
                <Form.Item
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your role",
                    },
                  ]}
                  className="m-0"
                >
                  <Input
                    type="text"
                    placeholder="Type here"
                    className="bg-gray-100 border-none p-2"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="w-full mt-6 text-center">
              <Form.Item label={null}>
                <Button
                  type="text"
                  className="bg-primaryColor font-semibold text-white hover:bg-primaryColor/80 px-8 py-3 uppercase w-1/2 mx-auto tracking-wider font-mulish"
                  htmlType="submit"
                >
                  Save Settings
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
