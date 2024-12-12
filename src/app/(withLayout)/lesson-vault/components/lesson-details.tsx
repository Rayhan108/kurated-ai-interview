"use client";
import MyButton from "@/components/shared/common/my-button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function LessonDetails() {
  const [transcript, setTranscript] = useState(false);

  return (
    <div className="space-y-3">
      <video
        src={
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        }
        controls
        className="rounded-lg w-full bg-black"
        autoPlay
      ></video>

      <div className="flex justify-between items-center font-bold gap-4 space-y-3">
        <h1 className="text-sm md:text-base">
          Lesson 1: The Kurated Approach to Recruiting and Interviewing
          Transcript
        </h1>

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
    </div>
  );
}
