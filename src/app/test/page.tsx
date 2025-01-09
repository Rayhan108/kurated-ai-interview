"use client";

import {
  useGetPortfolioExperienceQuery,
  useGetSavedStoryQuery,
} from "@/redux/feature/storybank/storybank-api";
import { useState } from "react";

const App = () => {
  const [clickedCell, setClickedCell] = useState(null);
  const { data: savedStory, isLoading } = useGetSavedStoryQuery(undefined);
  const { data: savedExperience } = useGetPortfolioExperienceQuery(undefined);
  console.log(savedStory?.data?.response);
  console.log(savedExperience?.data?.response);

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
  console.log(clickedCell);

  // Existing data
  //   const data = [
  //     { x: "A", y: "1", value: 10 },
  //     { x: "B", y: "1", value: 20 },
  //     { x: "A", y: "2", value: 30 },
  //     { x: "C", y: "2", value: 40 },
  //   ];

  // Define x-axis and y-axis with label and value
  //   const xAxis = [
  //     { label: "Column A", value: "A" },
  //     { label: "Column B", value: "B" },
  //     { label: "Column C", value: "C" },
  //     { label: "Column D", value: "D" },
  //   ];

  //   const yAxis = [
  //     { label: "Row 1", value: "1" },
  //     { label: "Row 2", value: "2" },
  //     { label: "Row 3", value: "3" },
  //   ];

  // Function to get cell value based on x and y IDs
  const getCellValue = (xValue, yValue) => {
    const cell = data.find((item) => item.x === xValue && item.y === yValue);
    return cell ? cell : ""; // Return value if found, else empty
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dynamic Data Grid</h1>
      <table className="table-auto border-collapse border border-gray-300 text-center">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-[10px] border-white px-4 py-2"></th>{" "}
            {/* Empty cell for top-left corner */}
            {xAxis?.map((x) => (
              <th
                key={x.value}
                className="border-[10px] border-white px-4 py-2"
              >
                {x.label} {/* Display the label */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {yAxis?.map((y) => (
            <tr key={y.value}>
              <th className="border-[10px] border-white bg-gray-100">
                <p className="text-sm font-semibold bg-primaryColor/70 rounded-md p-3 w-40 md:w-52">
                  {y.label}
                </p>
                {/* {y.label} Display the label */}
              </th>
              {xAxis?.map((x) => (
                <td
                  key={`${y.value}-${x.value}`}
                  className="border-[10px] border-white px-4 py-2 rounded-xl bg-red-100 m-2"
                  onClick={() => {
                    setClickedCell({
                      topicId: x,
                      experienceId: y,
                      storyId: getCellValue(x.value, y.value).storyId,
                    });
                  }}
                >
                  {getCellValue(x.value, y.value).value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
