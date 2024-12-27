import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { CornerUpRight, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface IExperience {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}
export const ParsedResume = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  // const [selectedExperience, setSelectedExperience] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedExperience, setEditedExperience] = useState<IExperience>();
  const [currentEmployee, setCurrentEmployee] = useState(false);

  const [experienceLocal] = useLocalStorage(
    KeyConstant.PARSED_EXPERIENCE,
    null
  );
  const [selectedExperienceLocal, setSelectedExperienceLocal] = useLocalStorage(
    KeyConstant.SELECTED_EXPERIENCE,
    null
  );

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {!isEditing && (
        <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto place-content-center py-10">
            <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
              Choose One Experience To Start Your Story Crafting Journey
            </p>

            <div className="px-0 md:px-5">
              <p className="text-gray-500 py-2">
                Select an experience to identify which predicted interview
                questions for your target role it can best address.
              </p>
              <div className="space-y-4">
                {experienceLocal?.map((item, index) => (
                  <div>
                    <div
                      className={`border rounded-md p-4 hover:cursor-pointer  ${
                        selectedExperienceLocal === index?.toString()
                          ? "bg-green-50 border-green-200 hover:bg-green-50"
                          : "hover:bg-primaryColor/10"
                      }`}
                      onClick={() =>
                        setSelectedExperienceLocal(index.toString())
                      }
                    >
                      <div className="space-y-2">
                        <p className="font-bold">
                          Your title{" "}
                          <span className="font-normal text-gray-500">
                            {item.job_title}
                          </span>
                        </p>
                        <p className="font-bold">
                          Company{" "}
                          <span className="font-normal text-gray-500">
                            {item.employer}
                          </span>
                        </p>
                        <p className="font-bold">
                          Dates of Employment{" "}
                          <span className="font-normal text-gray-500">
                            {item.dates_of_employment}
                          </span>
                        </p>
                        <div className="md:flex gap-4">
                          <p className="font-bold">Description</p>
                          <p>{item.responsibilities}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <Button
                        type="text"
                        className="px-1"
                        onClick={() => {
                          setIsEditing(true);
                          setEditedExperience({
                            title: "Product Manager",
                            company: "Kurated.ai",
                            startDate: "May 2023",
                            endDate: "June 2024",
                            description: "lorem ipsum",
                          });
                        }}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t p-3 w-full bg-white">
            <div className="float-right">
              <div className="space-x-2">
                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString()); // Clone existing params
                    const step = params.get(KeyConstant.STEP);
                    params.set(KeyConstant.STEP, `${Number(step) - 1}`);

                    router.push(`?${params.toString()}`);
                  }}
                  variant="ghost"
                >
                  Back
                </MyButton>
                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString()); // Clone existing params

                    params.set(KeyConstant.STEP, "6");

                    router.push(`?${params.toString()}`);
                  }}
                  variant="outline"
                  endIcon={<CornerUpRight />}
                  disabled={!selectedExperienceLocal}
                >
                  Next
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
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
                  <Typography.Title level={5}>Your title</Typography.Title>
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
                    <Input defaultValue={editedExperience.title} />
                  </Form.Item>
                </div>
                <div>
                  <Typography.Title level={5}>Company</Typography.Title>
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
                      <Typography.Title level={5}>Start Date</Typography.Title>
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
                          <Typography.Title level={5}>
                            End Date
                          </Typography.Title>
                        )}

                        <Checkbox
                          value={currentEmployee}
                          onChange={(e) => setCurrentEmployee(e.target.checked)}
                        >
                          Current Employee
                        </Checkbox>
                      </div>
                      {!currentEmployee && (
                        <Form.Item
                          name="endDate"
                          rules={[
                            {
                              required: currentEmployee ? false : true,
                              message: "Please input a date",
                            },
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
                  <Typography.Title level={5}>Description</Typography.Title>
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
                    setIsEditing(false);
                    setEditedExperience(null);
                  }}
                  variant="ghost"
                  className="text-red-500 hover:text-red-500"
                >
                  Discard
                </MyButton>
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
      )}
    </div>
  );
};
