import MyButton from "@/components/shared/common/my-button";
import { StatusCode } from "@/constants/code.constant";
import { KeyConstant } from "@/constants/key.constant";
import {
  useGenerateStoryInHearsQuery,
  useReGenerateStoryInHearsMutation,
  useSaveStoryMutation,
} from "@/redux/feature/storybank/storybank-api";
import { Button, Form, Input, message, Steps } from "antd";
import { ChevronLeft, ChevronRight, Save, SquarePen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const StoryCrafting = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState("");
  const [context, setContext] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [stories, setStories] = useState([]);

  const [selectedRelevanceTopics] = useLocalStorage(
    KeyConstant.SELECTED_RELEVANCE,
    []
  );
  const [experienceLocal] = useLocalStorage(
    KeyConstant.PARSED_EXPERIENCE,
    null
  );
  const [selectedExperienceLocal] = useLocalStorage(
    KeyConstant.SELECTED_EXPERIENCE,
    null
  );
  const [selectedRoleTopics] = useLocalStorage(
    KeyConstant.SELECTED_ROLE_TOPICS,
    null
  );
  const [craftingType] = useLocalStorage(KeyConstant.CRAFTING_TYPE, null);

  const currentExperience = experienceLocal?.find((item, index) => {
    if (index.toString() === selectedExperienceLocal) {
      return item;
    }
  });

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = selectedRelevanceTopics?.map((item, index) => ({
    index: index,
    content: `${item.roleTopic}`,
    relevance: item.relevance,
    _id: item._id,
  }));
// console.log(steps)
  const items = steps.map((item) => ({
    key: item.index,
    title: null,
  }));

  const { data, isFetching } = useGenerateStoryInHearsQuery({
    role: selectedRoleTopics?.role,
    roleTopic: steps[current]?.content,
    experience: currentExperience.responsibilities,
  });

  const [reGenerateStoryInHears, { isLoading: regenLoading }] =
    useReGenerateStoryInHearsMutation();

  const reGenerateOnSubmit = () => {
    reGenerateStoryInHears({
      role: selectedRoleTopics?.role,
      roleTopic: steps[current]?.content,
      storyInHearsFormat: answer,
      relevance: steps[current]?.relevance,
      context: context,
    })
      .unwrap()
      .then((res) => {
        if (res.code === 200) {
          setAnswer(res?.data?.result);
          setContext("");
          setStories((prev) => {
            const topicId = steps[current]?._id;

            // Check if the topicId exists in the state
            const existingItem = prev.find((item) => item.topicId === topicId);

            if (existingItem) {
              // Overwrite the existing item
              return prev.map((item) =>
                item.topicId === topicId
                  ? { ...item, storyText: data?.data?.result }
                  : item
              );
            } else {
              // Add a new item
              return [
                ...prev,
                {
                  storyText: data?.data?.result,
                  topicId,
                },
              ];
            }
          });
        }
      })
      .catch((err) => {
        message.error(err?.data?.message);
      });
  };

  useEffect(() => {
    setAnswer(data?.data?.result);

    setStories((prev) => {
      const topicId = steps[current]?._id;

      // Check if the topicId exists in the state
      const existingItem = prev.find((item) => item.topicId === topicId);

      if (existingItem) {
        // Overwrite the existing item
        return prev.map((item) =>
          item.topicId === topicId
            ? { ...item, storyText: data?.data?.result }
            : item
        );
      } else {
        // Add a new item
        return [
          ...prev,
          {
            storyText: data?.data?.result,
            topicId,
          },
        ];
      }
    });
  }, [data]);

  const [parsedExperience] = useLocalStorage(
    KeyConstant.PARSED_EXPERIENCE,
    null
  );
  const [selectedExperience] = useLocalStorage(
    KeyConstant.SELECTED_EXPERIENCE,
    null
  );
  const [selectedRelevance] = useLocalStorage(
    KeyConstant.SELECTED_RELEVANCE,
    []
  );

  const experience = parsedExperience?.find((item, index) => {
    if (index.toString() === selectedExperience) {
      return item;
    }
  });

  const [saveStoryOnsubmit, { isLoading }] = useSaveStoryMutation();
  const onFinish = (values) => {
    console.log("Success:", values);
    setEditedAnswer(values.answer);
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
              Refining your story in HEARS format
            </p>

            <p className="px-5 font-semibold">
              Edit your draft answer directly or add more context and press
              regenerate to see a new version of your story. Press Finish below
              when you're ready to save this interview story.
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
                        }}
                      >
                        <SquarePen size={18} className="text-gray-400" />
                      </Button>
                    </div>
                    <div
                      className={`border rounded-md p-4 bg-gray-50 min-h-60 overflow-y-auto ${
                        isFetching ? "animate-pulse bg-gray-100" : ""
                      }`}
                    >
                      {isFetching ? (
                        <p>Generating...</p>
                      ) : (
                        <div>
                          <Input.TextArea
                            readOnly
                            rows={10}
                            value={answer}
                            className="h-full bg-transparent border-none ring-0 "
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="font-bold text-base">Add more context</p>

                    <Input.TextArea
                      rows={5}
                      value={context}
                      placeholder="If you need to add more context to the story above, feel free to do that here and regenerate your answer"
                      onChange={(e) => setContext(e.target.value)}
                    />
                    <Button
                      type="text"
                      className="px-1 text-primaryColor my-1"
                      onClick={() => reGenerateOnSubmit()}
                      loading={regenLoading}
                    >
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {items.length > 1 && (
                <Steps
                  direction="horizontal"
                  responsive={false}
                  current={current}
                  items={items}
                  size="small"
                  className="md:w-1/2 mx-auto px-10"
                />
              )}
            </div>
          </div>

          <div className="border-t p-3 w-full bg-white">
            <div className="float-right items-center">
              <div className="flex items-center gap-2">
                <MyButton
                  onClick={() => current > 0 && prev()}
                  startIcon={<ChevronLeft />}
                  disabled={current == 0}
                  variant="ghost"
                  className="bg-red-400 text-white"
                >
                  Previous Story
                </MyButton>

                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString()); // Clone existing params

                    params.set(KeyConstant.STEP, "8");

                    if (current < steps.length - 1) {
                      next();
                    } else {
                      const dto = {
                        experience: {
                          title: experience?.job_title,
                          date_start:
                            experience?.dates_of_employment?.split("-")[0],
                          date_end:
                            experience?.dates_of_employment?.split("-")[1] ||
                            "present",
                          description: Array.isArray(
                            experience?.responsibilities
                          )
                            ? experience?.responsibilities?.join(" ")
                            : experience?.responsibilities,
                          company: experience?.employer,
                          type: craftingType, // Allowed Ones are EXTRACTED,PERSONAL
                        },
                        stories: [
                          {
                            current: stories?.map((item) => ({
                              storyText: item.storyText,
                              topic_id: item.topicId,
                            })),
                            removed: [],
                          },
                        ],
                        topic_relevancies: selectedRelevance?.map((item) => ({
                          topic_id: item._id,
                          relevancy: item.relevance,
                        })),
                      };

                      saveStoryOnsubmit(dto)
                        .unwrap()
                        .then((res) => {
                          if (res.code === StatusCode.OK) {
                            message.success(res.message);
                            router.push(`?${params.toString()}`);
                          }
                        })
                        .catch((err) => {
                          message.error(err.data.message);
                        });
                    }
                  }}
                  variant="outline"
                  endIcon={<ChevronRight />}
                  className="bg-red-400 text-white"
                  disabled={isFetching}
                  loading={isLoading}
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
                  defaultValue={answer}
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                />
              </Form.Item>
            </div>

            <div className="border-t py-3 w-full bg-white">
              <div className="flex justify-between gap-1">
                <MyButton
                  onClick={() => {
                    setIsEditing(false);
                    setEditedAnswer("");
                  }}
                  variant="ghost"
                  className="text-red-500 hover:text-red-500"
                >
                  Discard
                </MyButton>
                <Form.Item label={null} className="m-0">
                  <MyButton
                    onClick={() => {
                      setStories((prev) => {
                        const topicId = steps[current]?._id;

                        // Check if the topicId exists in the state
                        const existingItem = prev.find(
                          (item) => item.topicId === topicId
                        );

                        if (existingItem) {
                          // Overwrite the existing item
                          return prev.map((item) =>
                            item.topicId === topicId
                              ? { ...item, storyText: editedAnswer }
                              : item
                          );
                        }
                      });
                      setAnswer(editedAnswer);
                      setIsEditing(false);
                      setEditedAnswer("");
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
