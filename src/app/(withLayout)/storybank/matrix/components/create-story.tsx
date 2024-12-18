"use client";
import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const CreateStory = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <div>
      <div className="h-[calc(100vh-230px)] flex justify-center items-center">
        <div className="space-y-2">
          <p className="text-gray-400 text-center">
            Get Started with the Onboarding Process and create your first story
          </p>
          <div className="w-fit mx-auto">
            <MyButton
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set(KeyConstant.MODAL, "true");
                params.set(KeyConstant.STEP, "1");
                router.push(`?${params.toString()}`);
              }}
              className="bg-red-500 flex gap-1 items-center shadow-md hover:bg-red-500/80 "
            >
              <Plus size={16} /> Start Creating your New Story
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
};
