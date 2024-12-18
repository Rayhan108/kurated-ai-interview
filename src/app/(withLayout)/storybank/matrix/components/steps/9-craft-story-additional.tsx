import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { Button, Form, Input, Typography } from "antd";
import { Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const CraftingAdditionStory = () => {
  const searchParam = useSearchParams();
  const router = useRouter();

  const onFinish = (values) => {
    console.log("Success:", values);
    const params = new URLSearchParams(searchParam.toString());
    params.set(KeyConstant.STEP, "6");

    router.push(`?${params.toString()}`);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto py-10">
            <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
              Edit Experience
            </p>
            <div className="space-y-2 px-2">
              <div>
                <Typography.Title level={5}>Title</Typography.Title>
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please input your title",
                    },
                  ]}
                  className="m-0"
                >
                  <Input placeholder="Name your story in max 5 words" />
                </Form.Item>
              </div>

              <div>
                <Typography.Title level={5}>Your Role</Typography.Title>
                <Form.Item
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please input your role",
                    },
                  ]}
                  className="m-0"
                >
                  <Input placeholder="What is your role in this story" />
                </Form.Item>
              </div>

              <div>
                <Typography.Title level={5}>Where</Typography.Title>
                <Form.Item
                  name="where"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  className="m-0"
                >
                  <Input placeholder="Where did this happen" />
                </Form.Item>
              </div>

              <div>
                <Typography.Title level={5}>
                  General Information
                </Typography.Title>
                <Form.Item
                  name="generalInfo"
                  rules={[
                    {
                      required: true,
                      message: "Please input your general info",
                    },
                  ]}
                  className="m-0"
                >
                  <Input.TextArea
                    placeholder="Complete description and context of the story"
                    rows={6}
                  />
                </Form.Item>
              </div>

              <div>
                <Typography.Title level={5}>Challenges</Typography.Title>
                <Form.Item
                  name="challenges"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  className="m-0"
                >
                  <Input placeholder="Challenges faced" />
                </Form.Item>
              </div>
              <div>
                <Typography.Title level={5}>Accomplishments</Typography.Title>
                <Form.Item
                  name="accomplishments"
                  rules={[
                    {
                      required: true,
                      message: "Required",
                    },
                  ]}
                  className="m-0"
                >
                  <Input placeholder="Whats did you achieve" />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="border-t py-3 w-full bg-white">
            <div className="flex justify-between gap-1">
              <Button
                type="text"
                onClick={() => {
                  const params = new URLSearchParams(searchParam.toString()); // Clone existing params
                  const step = params.get(KeyConstant.STEP);
                  params.set(KeyConstant.STEP, `3`);

                  router.push(`?${params.toString()}`);
                }}
                className="text-red-500 hover:text-red-500"
              >
                Discard
              </Button>
              <Form.Item label={null} className="m-0">
                <MyButton
                  onClick={() => {
                    // setIsEditing(false);
                  }}
                  variant="outline"
                  startIcon={<Save />}
                  className="border-black"
                >
                  Save
                </MyButton>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
