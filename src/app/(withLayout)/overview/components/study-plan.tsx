"use client";
import { AllImages } from "@/assets/AllImages";
import { MyLinkButton } from "@/components/shared/common/my-link-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyConstant } from "@/constants/key.constant";
import { useLoggedInUserQuery } from "@/redux/feature/auth/authApi";
import { SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type ILessonType =
  | "curriculum"
  | "one-week"
  | "six-week"
  | "twelve-week"
  | undefined;
export type valueType = {
  title: string;
  value: ILessonType;
}


const StudyPlan = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { data, isLoading } = useLoggedInUserQuery(undefined);

  const [selectedTab, setSelectedTab] = useState<ILessonType>(
    (searchParams.get(KeyConstant.TAB) as ILessonType) || "curriculum"
  );

  const tabList: valueType[] = [
    { title: "Curriculum", value: "curriculum" },
    { title: "1 Week Study Plan", value: "one-week" },
    { title: "6 Week Study Plan", value: "six-week" },
    { title: "12 Week Study Plan", value: "twelve-week" },
  ];

  useEffect(() => {
    if (!selectedTab) {
      setSelectedTab("curriculum");
      router.replace(`${pathname}?${KeyConstant.TAB}=curriculum`);
    }
  }, []);

  const handleTabChange = (value: ILessonType) => {
    setSelectedTab(value);
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set(KeyConstant.TAB, value);
    router.push(`${pathname}?${currentParams.toString()}`);
  };

  return (
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
        <MyLinkButton href={`/lesson-vault`} className="bg-red-400 hidden md:block w-fit">
          Start Learning
        </MyLinkButton>
      </div>

      <MySpacer className="h-5" />

      <p>
        Welcome to Kurated Interview!
        <br />
        Kurated Interview is a complete interview prep guide that includes 14+ hours of content,
        including 14 modules with over 70 lesson videos. You also have access to downloadable
        worksheets to guide your work and progress. Explore the course curriculum and choose from
        our 1-week, 6-week, or 12-week playlists, tailored to your current stage in the interviewing
        process.
      </p>

      <MySpacer className="h-5" />

      <div className="space-y-4">
        <Tabs defaultValue={selectedTab} className="">
          <TabsList className="inline-grid md:inline-flex h-fit w-full md:w-fit">
            {tabList.map((item: valueType) => (
              <TabsTrigger key={item.value} value={item.value} onClick={() => handleTabChange(item.value)}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div>
          {selectedTab === "curriculum" && (
            <div>
              <p>
                Start here to understand the full contents of the course. Click on the left thumbnail
                to view or download the full curriculum and watch the video to get an overview of the document.
              </p>
              <Link href="/overview/curriculum" className="text-red-400 underline flex w-fit gap-1 items-center font-bold py-3">
                View Curriculum <SquareArrowOutUpRight size={14} />
              </Link>
              <div>
                <video
                  src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                  controls
                  className="rounded-lg w-full lg:w-2/3 bg-black"
                  autoPlay
                ></video>
              </div>
            </div>
          )}

          {selectedTab === "one-week" && (
            <div>
              <h2 className="text-lg font-semibold">1 Week Study Plan</h2>
              <p>This is a fast-paced study plan designed to get you ready in just 1 week.</p>
            </div>
          )}

          {selectedTab === "six-week" && (
            <div>
              <h2 className="text-lg font-semibold">6 Week Study Plan</h2>
              <p>Comprehensive plan to prepare you over a 6-week period.</p>
            </div>
          )}

          {selectedTab === "twelve-week" && (
            <div>
              <h2 className="text-lg font-semibold">12 Week Study Plan</h2>
              <p>In-depth preparation over 12 weeks to master every topic.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
