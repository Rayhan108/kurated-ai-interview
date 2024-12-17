import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { Checkbox, Progress } from "antd";
import { CornerUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const StoryRelevance = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [selectedRelevance, setSelectedRelevance] = useState([]);

  const success = searchParam.get(KeyConstant.SUCCESS);

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
  };

  console.log(selectedRelevance);
  useEffect(() => {
    // Store checked items in local storage when state changes
    localStorage.setItem(
      KeyConstant.RELEVANCE_IDS,
      JSON.stringify(selectedRelevance)
    );
  }, [selectedRelevance]);

  const relevance = [
    {
      id: "1",
      title: "Data Science",
      progress: 34,
    },
    {
      id: "2",
      title: "Data",
      progress: 55,
    },
    {
      id: "3",
      title: "Science",
      progress: 90,
    },
    {
      id: "4",
      title: "Machine Learning",
      progress: 78,
    },
    {
      id: "5",
      title: "Artificial Intelligence",
      progress: 49,
    },
    {
      id: "6",
      title: "Computer Vision",
      progress: 67,
    },
    {
      id: "7",
      title: "Natural Language Processing",
      progress: 89,
    },
    {
      id: "8",
      title: "Robotics",
      progress: 23,
    },
    {
      id: "9",
      title: "Statistics",
      progress: 56,
    },
    {
      id: "10",
      title: "Data Visualization",
      progress: 82,
    },
  ];

  return (
    <div>
      {success ? (
        <div>
          <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto place-content-center py-10">
              <div className="md:w-3/4 mx-auto space-y-8">
                <div>
                  <p className="font-semibold text-gray-600 py-3 text-2xl text-center">
                    Great! Now, its the final step!
                  </p>
                  <p className="font-semibold text-sm text-center">
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
        <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto place-content-center py-10">
            <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
              View Relevance Of Your Experience Against The Predicted Interview
              Topics
            </p>

            <div className="px-5">
              <p className="text-gray-500 py-3 ">
                Select up to 4 topics for Kurated to generate stories
              </p>
              <div className="space-y-4">
                <div className="space-y-3">
                  {relevance.map((item) => (
                    <div className="grid grid-cols-3 items-center">
                      <div className="col-span-1">
                        <Checkbox
                          name={item.id}
                          onChange={handleCheckboxChange}
                          checked={selectedRelevance.includes(item.id)}
                          className="font-medium"
                        >
                          {item.title}
                        </Checkbox>
                      </div>
                      <div className="col-span-2">
                        <Progress
                          percent={item.progress}
                          status="normal"
                          strokeColor={
                            item.progress < 80
                              ? item.progress < 50
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
                    params.set(KeyConstant.SUCCESS, "true");
                    // params.set(KeyConstant.STEP, "6");

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
      )}
    </div>
  );
};
