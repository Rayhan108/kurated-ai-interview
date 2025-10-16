"use client";


import { AllImages } from "@/assets/AllImages";
import { MyLinkButton } from "@/components/shared/common/my-link-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyConstant } from "@/constants/key.constant";
import { useLoggedInUserQuery } from "@/redux/feature/auth/authApi";
import { useGetActiveSubscribeQuery } from "@/redux/feature/tools/tools-api";
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
  const [isLoaded, setIsLoaded] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading } = useLoggedInUserQuery(undefined);
  const { data: activeSubscription } = useGetActiveSubscribeQuery(undefined);
  console.log("active subscription ----------->", activeSubscription);
  const isActive = activeSubscription?.data?.result;
  console.log("is subscription active----------->", isActive?.length);
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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
        {/* <MyLinkButton href={`/lesson-vault`} className="bg-red-400 hidden md:block w-fit">
          Start Learning
        </MyLinkButton> */}
<button
  // disabled={!isActive || isActive.length === 0}
  className={`px-4 py-2 rounded-md font-medium transition-colors 

    ${!isActive || isActive.length === 0 
      ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
      : 'bg-red-400  text-white'}

      `}
>
  Start Learning
</button>

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
        
        {/* Curriculum Video */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
          <div>
            <Link href="https://uat.kurated.ai/assets/Curriculum-0691c17e.pdf">
              <Image src={AllImages.curriculumn} alt="curriculum" height={400} width={400} className="cursor-pointer" />
            </Link>
          </div>
          <div className="">
<video
  src="https://uat.kurated.ai/assets/Curriculum-1c030253.mp4"
  controls  // Ensures the play button is shown
  className={`rounded-lg w-full lg:w-[50%] bg-black transition-all duration-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
  onLoadedMetadata={() => setIsLoaded(true)}
  style={{ minWidth: "300px", minHeight: "200px" }}
></video>
       
          </div>
        </div>
      </div>
    )}

    {/* Similar structure for other tabs (one-week, six-week, twelve-week) */}
    {selectedTab === "one-week" && (
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
        <div>
          <Link href="https://uat.kurated.ai/assets/1-week-8c7a33e8.pdf">
            <Image src={AllImages.oneWeek} alt="curriculum" height={400} width={400} className="cursor-pointer" />
          </Link>
        </div>
        <div className="">
       
            <video
              src="https://uat.kurated.ai/assets/1-week-f1550b78.mp4"
              controls
              className={`rounded-lg w-full lg:w-[50%] bg-black transition-all duration-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              // autoPlay
              onLoadedMetadata={() => setIsLoaded(true)}
              style={{ minWidth: "300px", minHeight: "200px" }}
            ></video>
     
        </div>
      </div>
    )}

    {/* Repeat the same for "six-week" and "twelve-week" tabs */}
    {selectedTab === "six-week" && (
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
        <div>
          <Link href="https://uat.kurated.ai/assets/6-week-21769cdd.pdf">
            <Image src={AllImages.sixWeek} alt="curriculum" height={400} width={400} className="cursor-pointer" />
          </Link>
        </div>
        <div className="">
       
            <video
              src="https://uat.kurated.ai/assets/6-week-6aeee375.mp4"
              controls
              className={`rounded-lg w-full lg:w-[50%] bg-black transition-all duration-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              autoPlay
              onLoadedMetadata={() => setIsLoaded(true)}
              style={{ minWidth: "300px", minHeight: "200px" }}
            ></video>
      
        </div>
      </div>
    )}

    {selectedTab === "twelve-week" && (
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">
        <div>
          <Link href="https://uat.kurated.ai/assets/12-week-1a31f90d.pdf">
            <Image src={AllImages.twelveWeek} alt="curriculum" height={400} width={400} className="cursor-pointer" />
          </Link>
        </div>
        <div className="">
        
            <video
              src="https://uat.kurated.ai/assets/12-week-c0a79bd8.mp4"
              controls
              className={`rounded-lg w-full lg:w-[50%] bg-black transition-all duration-300 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
              autoPlay
              onLoadedMetadata={() => setIsLoaded(true)}
              style={{ minWidth: "300px", minHeight: "200px" }}
            ></video>
       
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default StudyPlan;
