import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { Steps, Upload } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { StoryCraftingForm } from "../story-crafting";
const { Dragger } = Upload;

export const StoryCrafting = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [current, setCurrent] = useState(0);

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
  return (
    <div>
      <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
        <div className="flex-1 overflow-y-auto place-content-center py-10">
          <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
            Your Kurated Story in HEARS format!
          </p>

          <StoryCraftingForm data={steps[current]?.content} />
          <div>
            <Steps
              current={current}
              items={items}
              size="small"
              className="w-1/2 mx-auto "
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
    </div>
  );
};
