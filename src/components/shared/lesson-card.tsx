"use client";

import { KeyConstant } from "@/constants/key.constant";
import { BookOpen, CircleCheckBig, PlayCircle } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import MyButton from "./common/my-button";
export interface ILesson {
  id: string;
  label: string;
  lessonType: "video" | "docs";
  thumbnail: StaticImageData;
  videoUrl?: string;
  content?: string;
}

export const LessonCard = ({ item }: { item: ILesson }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParams = (lessonId: string) => {
    const params = new URLSearchParams(searchParams.toString()); // Clone existing params
    params.set(KeyConstant.LESSON_ID, lessonId);
    params.set(KeyConstant.MODAL, "true");

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="min-w-[240px] lg:min-w-[300px] space-y-2 w-1/5 mb-6 group">
      <div className="w-full">
        {item.lessonType === "video" && (
          <div className="relative ">
            <div className="absolute bg-gray-600 h-full w-full top-0 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <MyButton
                onClick={() => updateParams(item.id)}
                variant="outline"
                className="bg-transparent text-white rounded-full"
              >
                Watch Now
              </MyButton>
            </div>
            <Image
              src={item.thumbnail}
              alt={item.label}
              className="w-full object-cover"
            />
          </div>
        )}
        {item.lessonType === "docs" && (
          <div className="h-full border-2 p-5 rounded-md space-y-6 lg:space-y-7 bg-gray-50">
            <p className="line-clamp-2 lg:line-clamp-3">{item.content}</p>
            <MyButton
              onClick={() => updateParams(item.id)}
              variant="outline"
              className="bg-transparent text-gray-500 border-2 w-full text-center hover:bg-white hover:text-black"
            >
              Open Lesson
            </MyButton>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center font-medium">
          {item.lessonType === "video" && <PlayCircle size={22} />}
          {item.lessonType === "docs" && <BookOpen size={22} />}
          <h2>{item.label}</h2>
        </div>

        <CircleCheckBig size={20} className={`text-green-500`} />
      </div>
    </div>
  );
};
