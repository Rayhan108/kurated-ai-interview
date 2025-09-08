import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { Checkbox, Form, Input, Typography } from "antd";
import { Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const CraftingAdditionStory = () => {
  const searchParam = useSearchParams();
    const [endDate, setEndDate] = useState(null);
  const router = useRouter();
  const [currentEmployee, setCurrentEmployee] = useState(false);

  const [, setParsedExperience] = useLocalStorage(
    KeyConstant.PARSED_EXPERIENCE,
    null
  );
  const onFinish = (values) => {
    const finalEndDate = values.endDate || endDate;
      const datesOfEmployment = `${values.startDate} ${finalEndDate ? `- ${finalEndDate}` : ""}`;
    setParsedExperience([
      {
        dates_of_employment:datesOfEmployment,
        employer: values.company,
        job_title: values.title,
        location: "",
        responsibilities: values.description,
      },
    ]);

    const params = new URLSearchParams(searchParam.toString());
    params.set(KeyConstant.STEP, "5");

    router.push(`?${params.toString()}`);
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };





    const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setCurrentEmployee(isChecked);

    // If checked, set the endDate to current date
    if (isChecked) {
      setEndDate(new Date().toISOString().split('T')[0]); // ISO format (YYYY-MM-DD)
    } else {
      setEndDate(null); // If unchecked, reset the endDate
    }
  };
  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="font-mulish"
      >
        <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto py-10">
            <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
              Personal story crafting
            </p>
            <div className="space-y-2 px-2">
              <div>
                <Typography.Title level={5} className="font-mulish">
                  Your title
                </Typography.Title>
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
                  <Input />
                </Form.Item>
              </div>
              <div>
                <Typography.Title level={5} className="font-mulish">
                  Company
                </Typography.Title>
                <Form.Item
                  name="company"
                  rules={[
                    {
                      required: true,
                      message: "Please input your title",
                    },
                  ]}
                  className="m-0"
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <p className="text-sm font-semibold pt-3 pb-1">
                  Dates of Employment
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Typography.Title level={5} className="font-mulish">
                      Start Date
                    </Typography.Title>
                    <Form.Item
                      name="startDate"
                      rules={[
                        {
                          required: true,
                          message: "Please input a date",
                        },
                      ]}
                      className="m-0"
                    >
                      <Input type="date" />
                    </Form.Item>
                  </div>
                  <div>
              <div className="flex justify-between items-center">
      {currentEmployee ? (
        <div></div>
      ) : (
        <Typography.Title level={5} className="font-mulish">
          End Date: {endDate ? endDate : 'Not set'}
        </Typography.Title>
      )}

      <Checkbox
        checked={currentEmployee}
        onChange={handleCheckboxChange}
        className="font-mulish"
      >
        Current Employee
      </Checkbox>
    </div>
                    {!currentEmployee && (
                      <Form.Item
                        name="endDate"
                        rules={[
                          {
                            required: !currentEmployee,
                            message: "Please input a date",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              const startDate = getFieldValue("startDate");
                              if (!value || !startDate) {
                                return Promise.resolve();
                              }
                              if (new Date(value) < new Date(startDate)) {
                                return Promise.reject(
                                  "End date cannot be before start date"
                                );
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}
                        className="m-0"
                      >
                        <Input type="date" />
                      </Form.Item>
                    )}
                  </div>
               
                </div>
              </div>
              <div>
                <Typography.Title level={5} className="font-mulish">
                  Description
                </Typography.Title>
                <Form.Item
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description",
                    },
                  ]}
                  className="m-0"
                >
                  <Input.TextArea rows={6} />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="border-t py-3 w-full bg-white">
            <div className="flex justify-between gap-1">
              <MyButton
                onClick={() => {
                  const params = new URLSearchParams(searchParam.toString()); // Clone existing params

                  params.set(KeyConstant.STEP, "3");

                  router.push(`?${params.toString()}`);
                }}
                variant="ghost"
                className="text-red-500 hover:text-red-500"
              >
                Discard
              </MyButton>
              <Form.Item label={null} className="m-0">
                <MyButton
                  onClick={() => {
                    // const params = new URLSearchParams(searchParam.toString()); // Clone existing params
                    // params.set(KeyConstant.STEP, "5");
                    // router.push(`?${params.toString()}`);
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
      {/* <Form
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
      </Form> */}
    </div>
  );
};
