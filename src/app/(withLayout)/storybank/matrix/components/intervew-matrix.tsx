"use client";
import { AllImages } from "@/assets/AllImages";
import { MyLoading } from "@/components/shared/common/my-loading";
import {
  useGetPortfolioExperienceQuery,
  useGetSavedStoryQuery,
} from "@/redux/feature/storybank/storybank-api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal, Tooltip } from "antd"; // Importing Ant Design modal
import Image from "next/image";

function InterviewMatrix() {
  const router = useRouter();
  const [clickedCell, setClickedCell] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [storyText, setStoryText] = useState("");
  const { data: savedStory, isLoading } = useGetSavedStoryQuery(undefined);
  const { data: savedExperience } = useGetPortfolioExperienceQuery(undefined);
  console.log("get save expirence===>",savedExperience);
// console.log("savedStory", savedStory);

  // const generateRandomColor = (opacity) => {
  //   const r = Math.floor(Math.random() * 256);
  //   const g = Math.floor(Math.random() * 256);
  //   const b = Math.floor(Math.random() * 256);
  //   return `rgba(${r}, ${g}, ${b}, ${opacity || 1})`;
  // };

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
        type: item.experience_info.type,
      });
    }
    return acc;
  }, []);
 
  const xAxis = savedExperience?.data?.response?.map((item) => ({
    value: item._id,
    label: item.title,
    company: item.company,
    type: item.type,
  }));
  // console.log("yAxis", yAxis);
  console.log("get Xaxis cell value===>",xAxis);
  const data = savedStory?.data?.response?.map((item) => ({
    storyId: item._id,
    x: item.experience_id,
    y: item.topic_id,
    value: item.story_text,
    type: item.experience_info.type,
  }));
  // console.log("data", data);
  // console.log("savedStory", savedStory?.data?.response?.map((item) => item.experience_info.type));

  const getCellValue = (xValue, yValue) => {
    return data.find((item) => item.x === xValue && item.y === yValue) || "";
  };

  const handleViewStory = (id) => {
    const story = savedStory?.data?.response?.find((item) => item._id === id);
    if (story) {
      setStoryText(story.story_text);
    } else {
      setStoryText("No story found");
    }
    setIsModalVisible(true);
  };

  const sections = storyText.split("**").filter((part) => part.trim() !== "");
console.log("sections===>",sections);
  return (
    <div className="">
      <div className="overflow-x-scroll">
        <table className="table-auto border-collapse border border-gray-300 text-center">
          <thead>
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
                  <Tooltip title={y.label}>
                    <p className="truncate cursor-pointer text-sm font-semibold h-16 place-content-center bg-primaryColor/70 rounded-md p-3 w-40 md:w-52">
                      {y.label}
                    </p>
                  </Tooltip>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
  {/* Check if xAxis has data */}
  {(xAxis?.length === 0 ? Array(5).fill({ value: '', label: '', company: '' }) : xAxis)?.map((x) => (
    <tr key={x.value || Math.random()}> {/* Use random key for empty rows */}
      <th className="border-[10px] border-white bg-white">
        <p className="text-sm font-semibold h-16 place-content-center bg-primaryColor/70 rounded-md p-3 w-40 md:w-52">
          <Tooltip title={x.label}>
            <p className="truncate cursor-pointer">{x.label || ''}</p> {/* Show Empty Row if no data */}
          </Tooltip>
          <Tooltip title={x.company}>
            <p className="truncate cursor-pointer w-full">{x.company || ''}</p> {/* Default if no company */}
          </Tooltip>
        </p>
      </th>
      {yAxis?.map((y) => (
        <td
          key={`${x.value || Math.random()}-${y.value}`}
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
            onClick={() =>
              handleViewStory(getCellValue(x.value, y.value).storyId)
            }
            className="cursor-pointer text-sm font-semibold h-16 place-content-center rounded-md p-3 w-40 md:w-52"
            style={
              getCellValue(x.value, y.value).value
                ? {
                    backgroundColor: " #EDEDED",
                    borderWidth: 1,
                  }
                : {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#f3f4f6",
                  }
            }
          >
            {getCellValue(x.value, y.value)?.value &&
              (getCellValue(x.value, y.value)?.type === "EXTRACTED" ? (
                <Image
                  src={AllImages.resumeIcon}
                  alt="pencil"
                  className="mx-auto h-5 w-5 cursor-pointer"
                />
              ) : getCellValue(x.value, y.value)?.type === "PERSONAL" ? (
                <Image
                  src={AllImages.personalStoryIcon}
                  alt="pencil"
                  className="mx-auto h-5 w-5 cursor-pointer"
                />
              ) : null)}
          </p>
        </td>
      ))}
    </tr>
  ))}
</tbody>

        </table>
      </div>
      <Modal
        title="Story Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="space-y-4">
          {
          
          sections.map((section, index) => {
            console.log("section from interview matrix==>",section);
           return <p key={index}>{section}</p>
})}
        </div>
      </Modal>
    </div>
  );
}

export default InterviewMatrix;
