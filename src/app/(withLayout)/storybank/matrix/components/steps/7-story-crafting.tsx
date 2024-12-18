import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { Button, Form, Input, Steps } from "antd";
import { ChevronLeft, ChevronRight, Save, SquarePen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const StoryCrafting = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAnswer, setEditedAnswer] = useState<{ answer: string }>();
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const localRelevanceIds = localStorage.getItem(KeyConstant.RELEVANCE_IDS);
  const relevanceIds = localRelevanceIds ? JSON.parse(localRelevanceIds) : [];

  const steps = relevanceIds.map((item) => ({
    id: item,
    content: `content ${item}`,
  }));

  const items = steps.map((item) => ({
    key: item.id,
    title: null,
  }));

  const onFinish = (values) => {
    console.log("Success:", values);
    setEditedAnswer({ answer: values.answer });
    setIsEditing(false);
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
              Your Kurated Story in HEARS format!
            </p>

            {/* <StoryCraftingForm data={steps[current]?.content} /> */}
            <div>
              <div className="px-5">
                <p className="text-gray-700 pt-6 pb-3">
                  Predictable Topic :{" "}
                  <span className="text-red-500 font-bold">
                    {steps[current]?.content}
                  </span>
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-base">
                        Response in HEARS Format
                      </p>
                      <Button
                        type="text"
                        className="px-1"
                        onClick={() => {
                          setIsEditing(true);
                          setEditedAnswer({
                            answer: "Product Manager",
                          });
                        }}
                      >
                        <SquarePen size={18} className="text-gray-400" />
                      </Button>
                    </div>
                    <div
                      className={`border rounded-md p-4 bg-gray-50 min-h-60 overflow-y-auto`}
                    >
                      <p className="text-sm">
                        {editedAnswer
                          ? editedAnswer.answer
                          : "This is your answer structured in the HEARS format"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-base">Add more context</p>

                    <Input.TextArea
                      rows={5}
                      placeholder="If you need to add more context to the story above, feel free to do that here and regenerate your answer"
                      onChange={() => {}}
                    />
                    <Button type="text" className="px-1 text-primaryColor my-1">
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Steps
                direction="horizontal"
                responsive={false}
                current={current}
                items={items}
                size="small"
                className="md:w-1/2 mx-auto px-10"
              />
            </div>
          </div>

          <div className="border-t p-3 w-full bg-white">
            <div className="float-right items-center">
              <div className="flex items-center gap-2">
                <MyButton
                  onClick={() => current > 0 && prev()}
                  startIcon={<ChevronLeft />}
                  variant="ghost"
                  className="bg-red-400 text-white"
                >
                  Previous Story
                </MyButton>

                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString()); // Clone existing params

                    params.set(KeyConstant.STEP, "8");

                    current < steps.length - 1
                      ? next()
                      : router.push(`?${params.toString()}`);
                  }}
                  variant="outline"
                  endIcon={<ChevronRight />}
                  className="bg-red-400 text-white"
                >
                  {current < steps.length - 1 ? "View Next Story" : "Finish"}
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
                Your Kurated Story in HEARS format!
              </p>
              <p className="text-gray-700 pt-6 pb-3">
                Your Answer for :{" "}
                <span className="text-red-500 font-bold">
                  {steps[current]?.content}
                </span>
              </p>
              <Form.Item label={null} name={"answer"}>
                <Input.TextArea
                  rows={5}
                  placeholder="This  is your answer structured in the HEARS format"
                  defaultValue={editedAnswer?.answer}
                />
              </Form.Item>
            </div>

            <div className="border-t py-3 w-full bg-white">
              <div className="flex justify-between gap-1">
                <MyButton
                  onClick={() => {
                    setIsEditing(false);
                    setEditedAnswer(null);
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
