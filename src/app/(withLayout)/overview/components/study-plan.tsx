"use client";
import { AllImages } from "@/assets/AllImages";
import { MyLinkButton } from "@/components/shared/common/my-link-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyConstant } from "@/constants/key.constant";
import { useLoggedInUserQuery } from "@/redux/feature/auth/authApi";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export type ILessonType =
  | "curriculum"
  | "one-week"
  | "six-week"
  | "twelve-week"
  | undefined;

const StudyPlan = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useLoggedInUserQuery(undefined);

  const tab = searchParams.get(KeyConstant.TAB) as ILessonType;
  const tabList = [
    {
      title: "Curriculum",
      value: "curriculum",
    },
    {
      title: "1 Week Study Plan",
      value: "one-week",
    },
    {
      title: "6 Week Study Plan",
      value: "six-week",
    },
    {
      title: "12 Week Study Plan",
      value: "twelve-week",
    },
  ];

  useEffect(() => {
    if (tab === null || tab === undefined) {
      const currentParams = new URLSearchParams(searchParams);
      currentParams.set(KeyConstant.TAB, "curriculum");

      // Update the URL without reloading the page
      router.replace(`${pathname}?${currentParams.toString()}`);
    }
  }, []);
  return (
    <div>
      <div>
        <div className="md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={AllImages.trophyIcon} alt="trophyIcon" />
            <h1 className="text-lg md:text-xl">
              Hey{" "}
              <span className="text-red-500 font-bold">
                {data?.data?.userProfile?.name}!
              </span>{" "}
              Let's Make Your Next Interview a Success!!
            </h1>
          </div>
          <MyLinkButton
            href={`/lesson-vault`}
            className="bg-red-400 hidden md:block w-[140px]"
          >
            Start Learning
          </MyLinkButton>
        </div>

        <MySpacer className="h-5" />
        <p>
          Welcome to Kurated Interview!
          <br />
          Kurated Interview is a complete interview prep guide that includes 14+
          hours of content, including 14 modules with over 70 lesson videos. You
          also have access to downloadable worksheets to guide your work and
          progress. bf Explore the course curriculum and choose from our 1-week,
          6-week, or 12-week playlists, tailored to your current stage in the
          interviewing process.
        </p>
      </div>

      <MySpacer className="h-5" />
      <div>
        <div className="space-y-4">
          <Tabs defaultValue={tab || "curriculum"} className="">
            <TabsList className="inline-grid md:inline-flex h-fit w-full md:w-fit p-0">
              {tabList.map((item) => (
                <TabsTrigger
                  value={item.value}
                  onClick={() => {
                    const currentParams = new URLSearchParams(searchParams);
                    currentParams.set(KeyConstant.TAB, item.value);

                    // Update the URL without reloading the page
                    router.push(`${pathname}?${currentParams.toString()}`);
                  }}
                  className="data-[state=active]:bg-primaryColor data-[state=active]:text-white text-[#373B3F] font-semibold  md:w-fit"
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <p>
            Start here to understand the full contents of the course. Click on
            the left thumbnail to view or download the full curriculum and watch
            the video to get an overview of the document
          </p>
        </div>

        <div>
          <Link
            href="/overview/curriculum"
            className="text-red-400 underline flex w-fit items-center font-bold py-3"
          >
            View Curriculum <ArrowUpRightIcon size={16} />
          </Link>

          <div>
            <video
              src={
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              }
              controls
              className="rounded-lg w-full lg:w-2/3 bg-black"
              autoPlay
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
