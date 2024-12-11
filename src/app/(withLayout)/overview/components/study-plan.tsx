"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KeyConstant } from "@/constants/key.constant";
import { ArrowUpRightIcon } from "lucide-react";
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
          Start here to understand the full contents of the course. Click on the
          left thumbnail to view or download the full curriculum and watch the
          video to get an overview of the document
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
  );
};

export default StudyPlan;
