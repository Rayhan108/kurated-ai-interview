"use client";

import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import { MyLoading } from "@/components/shared/common/my-loading";
import { KeyConstant } from "@/constants/key.constant";
import {
  useGetAllChaptersWithLessonsQuery,
  useGetSingleLessonQuery,
} from "@/redux/feature/interview/lesson-api";
import { CheckCircleFilled } from "@ant-design/icons";
import { Collapse, Drawer, Space } from "antd";
import { ChevronDown, ListVideo } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const LessonsList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonId = searchParams.get(KeyConstant.LESSON_ID);

  const [open, setOpen] = useState(false);

  const { data: chapters, isLoading } =
    useGetAllChaptersWithLessonsQuery(undefined);
  const { data: lesson } = useGetSingleLessonQuery(lessonId);

  if (isLoading) {
    return <MyLoading />;
  }

  const chaptersArray = Object.entries(chapters?.data?.data?.data)?.map(
    ([key, value]: [string, any]) => ({
      _id: key,
      chapterTitle: value.chapterTitle,
      lessons: value.lessons,
      chapterDetails: value.chapterDetails,
    })
  );

  const firstLessonId = chaptersArray[0]?.lessons[0]?._id;
  if (!lessonId) {
    router.push(`?${KeyConstant.LESSON_ID}=${firstLessonId}`);
  }
  return (
    <div>
      <div className="fixed bottom-4 left-0 px-4 w-full md:hidden">
        <div
          onClick={() => setOpen(true)}
          className="bg-[#f0bc4d] p-3 rounded-lg "
        >
          <div className="flex justify-between">
            <div className="flex gap-2 items-center font-medium">
              <ListVideo size={18} /> {lesson?.data?.data?.title}
            </div>
            <ChevronDown />
          </div>
          <span className="font-medium text-[10px] text-gray-700">
            {lesson?.data?.data?.time_required} mins
          </span>
        </div>
      </div>

      <Drawer
        title={
          <p className="flex items-center gap-2">
            <Image src={AllImages.starIcon} alt="starIcon" /> Lesson Vault
          </p>
        }
        placement={"bottom"}
        height={"100vh"}
        closable={false}
        open={open}
        extra={
          <Space>
            <MyButton variant="secondary" onClick={() => setOpen(false)}>
              Collapse <ChevronDown />
            </MyButton>
          </Space>
        }
      >
        <div className="space-y-2">
          {chaptersArray?.map((item) => (
            <Collapse
              expandIconPosition="right"
              className="border-0 rounded-lg bg-primaryColor/40"
              //   defaultActiveKey={1}
              items={[
                {
                  key: item.toString(),
                  label: (
                    <div>
                      <div className="flex gap-2 items-center font-medium">
                        <ListVideo size={18} /> {item.chapterTitle}
                      </div>
                      <span className="font-medium text-[10px] text-gray-700">
                        4:32
                      </span>
                    </div>
                  ),
                  children: (
                    <div className=" divide-y">
                      {item?.lessons
                        ?.slice()
                        .sort((a, b) => a.number - b.number)
                        ?.map((lesson) => (
                          <div
                            className={`space-y-1.5 hover:bg-gray-50 hover:cursor-pointer p-2 rounded-md ${
                              lessonId === lesson._id
                                ? "bg-gray-100 hover:bg-gray-100"
                                : ""
                            }`}
                            onClick={() => {
                              router.push(
                                `?${KeyConstant.LESSON_ID}=${lesson._id}`
                              );
                              setOpen(false);
                            }}
                          >
                            <span className="text-gray-600 uppercase text-[10px] font-semibold">
                              {lesson.type}
                            </span>

                            <h1 className="text-sm font-semibold leading-tight">
                              {lesson.title}
                            </h1>
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-[10px] text-gray-500">
                                {lesson.time_required} mins
                              </span>
                              <CheckCircleFilled className="text-green-500" />
                            </div>
                          </div>
                        ))}
                    </div>
                  ),
                },
              ]}
            />
          ))}
        </div>
      </Drawer>

      <div className="space-y-2 hidden md:block h-[70vh] overflow-y-scroll">
        {chaptersArray?.map((item) => (
          <Collapse
            expandIconPosition="right"
            className="border-0 rounded-lg bg-primaryColor/40"
            defaultActiveKey={firstLessonId}
            items={[
              {
                key: item._id,
                label: (
                  <div>
                    <div className="flex gap-2 items-center font-medium">
                      <ListVideo size={18} /> {item.chapterTitle}
                    </div>
                    <span className="font-medium text-[10px] text-gray-700">
                      4:32
                    </span>
                  </div>
                ),
                children: (
                  <div className=" divide-y">
                    {item?.lessons
                      ?.slice()
                      .sort((a, b) => a.number - b.number)
                      ?.map((lesson) => (
                        <div
                          className={`space-y-1.5 hover:bg-gray-50 hover:cursor-pointer p-2 rounded-md ${
                            lessonId === lesson._id
                              ? "bg-gray-100 hover:bg-gray-100"
                              : ""
                          }`}
                          onClick={() => {
                            router.push(
                              `?${KeyConstant.LESSON_ID}=${lesson._id}`
                            );
                          }}
                        >
                          <span className="text-gray-600 uppercase text-[10px] font-semibold">
                            {lesson.type}
                          </span>

                          <h1 className="text-sm font-semibold leading-tight">
                            {lesson.title}
                          </h1>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-[10px] text-gray-500">
                              {lesson.time_required} mins
                            </span>
                            <CheckCircleFilled className="text-green-500" />
                          </div>
                        </div>
                      ))}
                  </div>
                ),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};
