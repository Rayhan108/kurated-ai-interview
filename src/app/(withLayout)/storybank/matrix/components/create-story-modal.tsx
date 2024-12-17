"use client";
import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Onboarding } from "./steps/1-onboarding";
import Roles from "./steps/2-roles";
import { UploadExperience } from "./steps/3-upload-experience";
import { UploadResume } from "./steps/4-resume-upload";
import { ParsedResume } from "./steps/5-parsed-resume";
import { StoryRelevance } from "./steps/6-story-relevance";
import { StoryCrafting } from "./steps/7-story-crafting";
import { Finish } from "./steps/8-finish";

export const CreateStroyModal = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const step = searchParams.get(KeyConstant.STEP);
  const isModalOpen = searchParams.get(KeyConstant.MODAL);

  const stepList = [
    {
      step: "1",
      content: <Onboarding />,
    },
    {
      step: "2",
      content: <Roles />,
    },
    {
      step: "3",
      content: <UploadExperience />,
    },
    {
      step: "4",
      content: <UploadResume />,
    },
    {
      step: "5",
      content: <ParsedResume />,
    },
    {
      step: "6",
      content: <StoryRelevance />,
    },
    {
      step: "7",
      content: <StoryCrafting />,
    },
    {
      step: "8",
      content: <Finish />,
    },
  ];
  return (
    <>
      {isModalOpen === "true" && (
        <div className="fixed top-0 left-0 flex flex-1 w-full bg-gray-500/50 p-2 md:p-5 lg:p-10 h-screen z-50">
          <div className="bg-white h-full w-full lg:w-8/12 mx-auto rounded-lg pb-0 relative p-4">
            {/* <div className="flex flex-col h-full place-content-center"> */}
            <div className="">
              <div className="py-2 px-2 absolute top-0 right-0 z-50">
                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString()); // Clone existing params

                    params.delete(KeyConstant.MODAL);
                    params.delete(KeyConstant.STEP);

                    router.push(`?${params.toString()}`);
                  }}
                  variant="ghost"
                  className=""
                >
                  <X />
                </MyButton>
              </div>

              {stepList.map((item) => {
                if (item.step === step) {
                  return item.content;
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
