"use client";
import { Button, Form, Input, Typography } from "antd";

export const Privacy = () => {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div>
        <Form
          //   form={form} // Bind the form instance
          name="changePassword"
          initialValues={{}} // Leave this empty to avoid stale initial values
          onFinish={onFinish}
          layout="vertical"
          className="w-full font-mulish"
        >
          <div className="grid gap-3 w-full md:w-1/2 mx-auto">
            <h3 className="font-bold text-xl mb-6">Change your Password</h3>
            <div>
              <Typography.Title
                level={5}
                style={{ color: "#1A1A1A" }}
                className="font-mulish"
              >
                Old Password
              </Typography.Title>
              <Form.Item
                name="oldPass"
                rules={[
                  {
                    required: true,
                    message: "Please enter old password",
                  },
                ]}
                className="m-0"
              >
                <Input
                  type="password"
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
                New Password
              </Typography.Title>
              <Form.Item
                name="newPass"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password",
                  },
                ]}
                className="m-0"
              >
                <Input
                  type="password"
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
                Confirm Password
              </Typography.Title>
              <Form.Item
                name="conPass"
                rules={[
                  {
                    required: true,
                    message: "Please enter confirm password",
                  },
                ]}
                className="m-0"
              >
                <Input
                  type="password"
                  className="bg-gray-100 border-none p-2"
                />
              </Form.Item>
            </div>
          </div>
          <div className="w-full mt-6 text-center">
            <Form.Item label={null}>
              <Button
                type="text"
                className="bg-primaryColor font-medium text-white hover:bg-primaryColor/80 px-20 py-3 uppercase w-fit  mx-auto tracking-wider"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};
