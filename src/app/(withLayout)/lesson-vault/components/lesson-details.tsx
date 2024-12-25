"use client";
import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import {
  useGetSingleLessonQuery,
  useMarkLessonAsCompletedMutation,
} from "@/redux/feature/interview/lesson-api";
import { message } from "antd";
import parse from "html-react-parser";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LessonDetails() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get(KeyConstant.LESSON_ID);
  const { data, isLoading } = useGetSingleLessonQuery(lessonId);
  const [markLessonContentAsCompleted, { isLoading: markLoading }] =
    useMarkLessonAsCompletedMutation();

  const lesson = data?.data?.data;
  const [transcript, setTranscript] = useState(false);

  const handleMarkAsCompleted = async (id) => {
    try {
      await markLessonContentAsCompleted(id);
      message.success("Lesson marked as completed");
    } catch (error) {
      message.error("Failed to mark lesson as completed");
    }
  };

  return (
    <div className="space-y-3">
      {lesson?.type === "VIDEO" && (
        <video
          src={lesson.video_url}
          controls
          className="rounded-lg w-full bg-black"
          autoPlay
        ></video>
      )}

      <div className="flex justify-between items-center font-bold gap-4 space-y-3">
        <h1 className="text-sm md:text-base">{lesson?.title}</h1>

        <MyButton
          endIcon={transcript ? <ChevronUp /> : <ChevronDown />}
          variant="secondary"
          onClick={() => {
            setTranscript((prev) => !prev);
          }}
          className="border-0"
        >
          Transcript
        </MyButton>
      </div>
      <div>{lesson?.description && <p>{parse(lesson?.description)}</p>}</div>
      {transcript && (
        <p>
          Praesent nec metus nec elit tristique vestibulum. Pellentesque
          habitant morbi tristique senectus et netus et malesuada fames ac
          turpis egestas. Sed vel elit nec lorem venenatis scelerisque. Nullam
          lacinia, justo sit amet fermentum consequat, lorem arcu vehicula nisi,
          sit amet tempor justo mauris eget ex. Duis vitae felis vel orci
          volutpat maximus. Sed id interdum risus. Integer rutrum odio vel nulla
          bibendum tempus. Integer ultricies semper eros, ac molestie ligula
          fermentum vel. Vivamus eget tortor bibendum, pulvinar leo nec,
          sollicitudin odio. Suspendisse potenti. Donec fermentum justo in
          mollis bibendum.
        </p>
      )}

      <MySpacer className="h-5" />
      <div className="flex gap-2 justify-between items-center">
        <div>
          {lesson?.worksheet_url && (
            <>
              <MyButton
                variant="link"
                className="text-primaryColor underline font-bold hover:bg-primaryColor hover:text-white hover:no-underline"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href =
                    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
                  // link.setAttribute("download", "dummy.pdf");
                  link.style.display = "none";
                  link.target = "_blank";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download Worksheet
              </MyButton>
            </>
          )}
        </div>
        <div>
          <MyButton
            variant="outline"
            onClick={() => {
              handleMarkAsCompleted(lessonId);
            }}
            loading={markLoading}
            className="bg-primaryColor text-white"
          >
            Mark as Complete
          </MyButton>
        </div>
      </div>
    </div>
  );
}
