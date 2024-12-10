"use client";
import { KeyConstant } from "@/constants/key.constant";
import { BookOpen } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MyButton from "./common/my-button";

export interface IExercise {
  id: string;
  label: string;
}

export const ExerciseCard = ({ item }: { item: IExercise }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  return (
    <div className="border-2 p-5 rounded-md space-y-6 bg-gray-50">
      <div className="flex items-center gap-2 text-gray-700">
        <BookOpen size={22} className="text-gray-700" />

        <p className="font-semibold text-sm md:text-base">{item.label}</p>
      </div>

      <MyButton
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          params.set(KeyConstant.EXERCISE_ID, item.id);

          router.push(`${pathName}/exercise?${params.toString()}`);
        }}
        variant="ghost"
        className="bg-transparent text-gray-500 border-2 w-full text-center hover:bg-white hover:text-black"
      >
        Open Exercise
      </MyButton>
    </div>
  );
};
