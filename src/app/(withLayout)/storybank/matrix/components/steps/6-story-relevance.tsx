import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { useGetTopicRelevancyQuery } from "@/redux/feature/storybank/storybank-api";
import { Checkbox, Progress } from "antd";
import { CornerUpRight, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export const StoryRelevance = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const success = searchParam.get(KeyConstant.SUCCESS);
  const [selectedRelevance, setSelectedRelevance] = useState([]);

  const [selectedRole] = useLocalStorage(
    KeyConstant.SELECTED_ROLE_TOPICS,
    null
  );
  const [parsedExperience] = useLocalStorage(
    KeyConstant.PARSED_EXPERIENCE,
    null
  );
  const [selectedExperience] = useLocalStorage(
    KeyConstant.SELECTED_EXPERIENCE,
    null
  );
  const [, setSelectedRelevanceTopics] = useLocalStorage(
    KeyConstant.SELECTED_RELEVANCE,
    []
  );

  const experience = parsedExperience?.find((item, index) => {
    if (index.toString() === selectedExperience) {
      return item;
    }
  });

  const { data, isLoading } = useGetTopicRelevancyQuery({
    role: selectedRole?.role,
    roleTopics: selectedRole?.topics?.map((item) => item.topicName),
    experience: experience?.responsibilities,
  });

  const relevance = data?.data?.result?.relevance || {};

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setSelectedRelevance((prevCheckedItems) => {
      if (checked) {
        if (prevCheckedItems.length >= 4) {
          return prevCheckedItems;
        }
        return [...prevCheckedItems, name];
      } else {
        return prevCheckedItems.filter((id) => id !== name);
      }
    });

    setSelectedRelevanceTopics((prevCheckedItems) => {
      if (checked) {
        if (prevCheckedItems.length >= 4) {
          return prevCheckedItems;
        }
        return [
          ...prevCheckedItems,
          {
            roleTopic: name,
            relevance: relevance[name],
            _id: selectedRole?.topics?.find((i) => i.topicName === name)._id,
          },
        ];
      } else {
        return prevCheckedItems.filter((i) => i.roleTopic !== name);
      }
    });
  };

  return (
    <div>
      {success ? (
        <div>
          <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto place-content-center py-10">
              <div className="md:w-3/4 mx-auto space-y-8">
                <div>
                  <p className="font-semibold text-gray-600 py-3 text-xl md:text-2xl text-center">
                    Now it’s the final step!
                  </p>
                  <p className="font-semibold text-xs md:text-sm text-center">
                    Please review the stories created for each of the topics
                    that you have selected. You can edit, add more context and
                    regenerate the stories until you’re satisfied.
                  </p>
                </div>

                <Image
                  src={AllImages.checkIcon}
                  alt="check"
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="border-t p-3 w-full bg-white">
              <div className="float-right">
                <div className="space-x-2">
                  <MyButton
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParam.toString()
                      );
                      //   params.set(KeyConstant.STEP, `${Number(step) - 1}`);
                      params.delete(KeyConstant.SUCCESS);

                      router.push(`?${params.toString()}`);
                    }}
                    variant="ghost"
                  >
                    Back
                  </MyButton>
                  <MyButton
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParam.toString()
                      ); // Clone existing params

                      params.set(KeyConstant.STEP, "7");
                      // params.set(KeyConstant.STEP, "5");
                      params.delete(KeyConstant.SUCCESS);

                      router.push(`?${params.toString()}`);
                    }}
                    variant="outline"
                    endIcon={<CornerUpRight />}
                  >
                    Next
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="md:h-[calc(100vh-100px)] place-content-center">
              <p className="font-semibold text-lg text-center mb-4">
                Analyzing Your Experience
              </p>
              <Loader className="animate-spin mx-auto" />
            </div>
          ) : (
            <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
              <div className="flex-1 overflow-y-auto place-content-center py-10">
                <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
                  View Relevance Of Your Experience Against The Predicted
                  Interview Topics
                </p>

                <div className="px-5">
                  <p className="text-gray-500 py-3 ">
                    Select up to 4 topics for Kurated to generate stories
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      {Object?.keys(relevance)?.map((key) => (
                        <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                          <div className="col-span-1">
                            <Checkbox
                              name={key}
                              onChange={handleCheckboxChange}
                              checked={selectedRelevance.includes(key)}
                              className="font-bold font-mulish checked:bg-red-100"
                            >
                              {key}
                            </Checkbox>
                          </div>
                          <div className="colspan-1 md:col-span-2">
                            <Progress
                              percent={relevance[key]}
                              status="normal"
                              strokeColor={
                                relevance[key] < 80
                                  ? relevance[key] < 50
                                    ? "red"
                                    : "#EAB030"
                                  : "green"
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t p-3 w-full bg-white">
                <div className="float-right">
                  <div className="space-x-2">
                    <MyButton
                      onClick={() => {
                        const params = new URLSearchParams(
                          searchParam.toString()
                        ); // Clone existing params
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
                        const params = new URLSearchParams(
                          searchParam.toString()
                        ); // Clone existing params
                        params.set(KeyConstant.SUCCESS, "true");
                        // params.set(KeyConstant.STEP, "6");

                        router.push(`?${params.toString()}`);
                      }}
                      variant="outline"
                      endIcon={<CornerUpRight />}
                      disabled={selectedRelevance.length < 1}
                    >
                      Next
                    </MyButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
