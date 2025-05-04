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
import TranscriptViewer from "./transcript";
import { MyLoading } from "@/components/shared/common/my-loading";

export default function LessonDetails() {
  // temporary
  const [completed,setCompleted]=useState(false)

  const searchParams = useSearchParams();
  const lessonId = searchParams.get(KeyConstant.LESSON_ID);

  // ----------------------------------------------------------------------
  // here not any is_completed property
  const { data, isLoading } = useGetSingleLessonQuery(lessonId);
// ----------------------------------------------------------------------

  const [markLessonContentAsCompleted, { isLoading: markLoading }] =
    useMarkLessonAsCompletedMutation();

  const lesson = data?.data?.data;
  console.log("lesson========>",lesson);
  const [transcript, setTranscript] = useState(false);

  const handleMarkAsCompleted = async (id) => {
    try {
    const res=  await markLessonContentAsCompleted(id);
    console.log("response",res);
    // temporery
    setCompleted(res?.data?.success)
    
      message.success(res?.data?.message);
    } catch (error) {
      message.error("Failed to mark lesson as completed");
    }
  };

  return (
    <div className="space-y-3">
      {isLoading && <MyLoading />}

      {!isLoading && lesson?.type === "VIDEO" && (
        <video
          src={lesson.video_url}
          controls
          className="rounded-lg w-full bg-black"
          autoPlay
        ></video>
      )}

      <div className="flex justify-between items-center font-bold gap-4 space-y-3">
        <h1 className="text-sm md:text-base">{lesson?.title}</h1>

        {lesson?.type === "VIDEO" && (
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
        )}
      </div>

      {transcript && lesson?.video_subtitles && (
        <p>
          <TranscriptViewer url={lesson?.video_subtitles} />
        </p>
      )}
      <div>{lesson?.description && <p>{parse(lesson?.description)}</p>}</div>

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
        <div className="">

          <MyButton
            variant="outline"
            onClick={() => {
              console.log("lesson id",lessonId);
              handleMarkAsCompleted(lessonId);
            }}
            loading={markLoading}
            className={`${completed ? "bg-green-500 text-white" : "disabled"}  `}
            // className={`${lesson?.is_completed ? "bg-green-500 text-white" : "disabled"} 
            // `}
          >
            {
              completed ? "Mark as Incomplete" :  "Mark as Completed"
              // lesson?.is_completed ? "Mark as Incomplete" :  "Mark as Completed"
            }
          </MyButton>
        </div>
      </div>
    </div>
  );
}
{/* <CheckCircleFilled className="text-green-500" /> */}