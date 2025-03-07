"use client";

import { AllImages } from "@/assets/AllImages";
import { MyLoading } from "@/components/shared/common/my-loading";
import {
  useGetPortfolioExperienceQuery,
  useGetSavedStoryQuery,
} from "@/redux/feature/storybank/storybank-api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function InterviewMatrix() {
  const router = useRouter();
  const [clickedCell, setClickedCell] = useState(null);

  const generateRandomColor = (opacity?: number) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${opacity || 1})`;
  };

  const { data: savedStory, isLoading } = useGetSavedStoryQuery(undefined);
  const { data: savedExperience } = useGetPortfolioExperienceQuery(undefined);

  const topics = savedStory?.data?.response?.reduce((acc, item) => {
    const exists = acc.some((entry) => entry.topicId === item.topic_id);
    if (!exists) {
      acc.push({
        roleId: item.role_info.role_id,
        topicId: item.topic_id,
        topicName: item.role_info.topic_name,
      });
    }
    return acc;
  }, []);

  useEffect(() => {
    topics?.length < 1 && router.push("/storybank/matrix?modal=true&step=1");
  }, []);

  if (isLoading) {
    return <MyLoading />;
  }

  const yAxis = savedStory?.data?.response?.reduce((acc, item) => {
    const exists = acc.some((entry) => entry.value === item.topic_id);
    if (!exists) {
      acc.push({
        value: item.topic_id,
        label: item.role_info.topic_name,
      });
    }
    return acc;
  }, []);

  const xAxis = savedExperience?.data?.response?.map((item, index) => {
    return {
      value: item._id,
      label: item.title,
    };
  });

  const data = savedStory?.data?.response?.map((item) => {
    return {
      storyId: item._id,
      x: item.experience_id,
      y: item.topic_id,
      value: item.story_text.slice(0, 20).concat("..."),
    };
  });
  const getCellValue = (xValue, yValue) => {
    const cell = data.find((item) => item.x === xValue && item.y === yValue);
    return cell ? cell : ""; // Return value if found, else empty
  };
  console.log(clickedCell);
  return (
    <div className="">
      <div className="">
        <div className="overflow-x-scroll">
          <table className="table-auto border-collapse border border-gray-300 text-center">
            <thead className="">
              <tr>
                <th className="border-[10px] border-white bg-white">
                  <div className="mx-auto h-16 flex items-center justify-center w-40 md:w-52">
                    <Image
                      src={AllImages.storyBankIcon}
                      alt="storyBankIcon"
                      className="h-16 w-16 md:w-20 mx-auto"
                      width={100}
                    />
                  </div>
                </th>
                {yAxis?.map((y) => (
                  <th
                    key={y.value}
                    className="border-[10px] border-white bg-white ml-40 md:ml-52"
                  >
                    <p className="text-sm font-semibold h-16 place-content-center bg-primaryColor/70 rounded-md p-3 w-40 md:w-52">
                      {y.label}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {xAxis?.map((x) => (
                <tr key={x.value}>
                  <th className="border-[10px] border-white bg-white">
                    <p className="text-sm font-semibold h-16 place-content-center bg-primaryColor/70 rounded-md p-3 w-40 md:w-52">
                      {x.label}
                    </p>
                  </th>
                  {yAxis?.map((y) => (
                    <td
                      key={`${x.value}-${y.value}`}
                      className="border-[10px] border-white"
                      onClick={() => {
                        setClickedCell({
                          topicId: x,
                          experienceId: y,
                          storyId: getCellValue(x.value, y.value).storyId,
                        });
                      }}
                    >
                      <p
                        className="text-sm font-semibold h-16 place-content-center rounded-md p-3 w-40 md:w-52"
                        style={
                          getCellValue(x.value, y.value).value
                            ? {
                                backgroundColor: generateRandomColor(0.08),
                                borderWidth: 1,
                                borderColor: generateRandomColor(0.08),
                              }
                            : {
                                backgroundColor: "white",
                                borderWidth: 1,
                                borderColor: "#f3f4f6",
                              }
                        }
                      >
                        {getCellValue(x.value, y.value).value}
                      </p>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* previous one */}

      {/* <div className="overflow-x-scroll">
        <table className="table-auto border-collapse border border-gray-300 text-center">
          <thead className="">
            <tr>
              <th className="border-[10px] border-white bg-white">
                <div className="mx-auto h-16 flex items-center justify-center w-40 md:w-52">
                  <Image
                    src={AllImages.storyBankIcon}
                    alt="storyBankIcon"
                    className="h-16 w-16  md:w-20 mx-auto"
                    width={100}
                  />
                </div>
              </th>
              {xAxis?.map((x) => (
                <th
                  key={x.value}
                  className="border-[10px] border-white bg-white ml-40 md:ml-52"
                >
                  <p className="text-sm font-semibold h-16 place-content-center bg-primaryColor/70 rounded-md p-3 w-40 md:w-52">
                    {x.label}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {yAxis?.map((y) => (
              <tr key={y.value}>
                <th className="border-[10px] border-white bg-white">
                  <p className="text-sm font-semibold h-16 place-content-center bg-primaryColor/70 rounded-md p-3 w-40 md:w-52">
                    {y.label}
                  </p>
                </th>
                {xAxis?.map((x) => (
                  <td
                    key={`${y.value}-${x.value}`}
                    className="border-[10px] border-white"
                    onClick={() => {
                      setClickedCell({
                        topicId: x,
                        experienceId: y,
                        storyId: getCellValue(x.value, y.value).storyId,
                      });
                    }}
                  >
                    <p
                      className="text-sm  font-semibold h-16 place-content-center rounded-md p-3 w-40 md:w-52"
                      style={
                        getCellValue(x.value, y.value).value
                          ? {
                              backgroundColor: generateRandomColor(0.08),
                              borderWidth: 1,
                              borderColor: generateRandomColor(0.08),
                            }
                          : {
                              backgroundColor: "white",
                              borderWidth: 1,
                              borderColor: "#f3f4f6",
                            }
                      }
                      // style={{
                      //   backgroundColor: getCellValue(x.value, y.value).value
                      //     ? generateRandomColor(0.08)
                      //     : "white",

                      //   borderWidth: 2,
                      //   borderColor: "red",
                      // }}
                    >
                      {getCellValue(x.value, y.value).value}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default InterviewMatrix;
