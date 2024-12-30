"use client";

import { AllImages } from "@/assets/AllImages";
import { cn } from "@/lib/utils";
import { useGetInterviewMatrixQuery } from "@/redux/feature/storybank/storybank-api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const data = [
  {
    Title: "Resume Experience 1",
    Name: "John Doe",
    Email: "john.doe@example.com",
    Address: "123 Main St, Springfield",
    Date: "2022-01-01",
  },
  {
    Title: "Resume Experience 2",
    Name: "Jane Smith",
    Email: "jane.smith@example.com",
    Address: "",
    Date: "",
  },
  {
    Title: "Resume Experience 3",
    Name: "Alice Johnson",
    Email: "",
    Address: "789 Pine Rd, Gotham",
    Date: "2021-02-02",
  },
  {
    Title: "Resume Experience 4",
    Name: "Alice Johnson",
    Email: "alice.johnson@example.com",
    Address: "789 Pine Rd, Gotham",
    Date: "2020-03-03",
  },
  {
    Title: "Resume Experience 5",
    Name: "Alice Johnson",
    Email: "alice.johnson@example.com",
    Address: "789 Pine Rd, Gotham",
    Date: "2019-04-04",
  },
  {
    Title: "Resume Experience 6",
    Name: "Alice Johnson",
    Email: "alice.johnson@example.com",
    Address: "789 Pine Rd, Gotham",
    Date: "2018-05-05",
  },
  {
    Title: "Resume Experience 6",
    Name: "Alice Johnson",
    Email: "alice.johnson@example.com",
    Address: "789 Pine Rd, Gotham",
    Date: "2017-06-06",
  },
];
const transformedData = Object.keys(data[0]).reduce((acc, key) => {
  acc[key] = data.map((item) => item[key] || ""); // Handle missing fields with empty strings
  return acc;
}, {});
console.log("transformedData", transformedData);

function InterviewMatrix() {
  const router = useRouter();
  const generateRandomColor = (opacity?: number) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, ${opacity || 1})`;
  };

  const { data: interviewMatrix, isLoading } =
    useGetInterviewMatrixQuery(undefined);
  console.log(interviewMatrix);

  const matrix = interviewMatrix?.data?.response?.reduce((acc, item) => {
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

  console.log(matrix);

  useEffect(() => {
    matrix?.length < 1 && router.push("/storybank/matrix?modal=true&step=1");
  }, []);

  return (
    <div>
      <div className="flex items-start gap-2 mt-4">
        <div>
          <div className="w-40 md:w-52 space-y-2 pt-1">
            <div className="mx-auto h-16 flex items-center justify-center">
              <Image
                src={AllImages.storyBankIcon}
                alt="storyBankIcon"
                className="h-16 w-16  md:w-20 mx-auto"
                width={100}
              />
            </div>
            {matrix?.map((item) => (
              <div className="bg-primaryColor/70 rounded-md w-full text-center p-3 font-bold h-16 flex items-center justify-center">
                <p className="leading-tight line-clamp-2 text-xs">
                  {item.topicName}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <div>
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full table-auto border-collapse">
                  <tbody>
                    {Object.entries(transformedData).map(
                      ([header, values], index) => {
                        const valuee = values as [];
                        return (
                          <tr key={index} className="">
                            {valuee.map((value, idx) => (
                              <td key={idx} className="p-1">
                                <div
                                  className={cn(
                                    ` rounded-md w-40 md:w-52 text-center p-3 font-bold h-16 flex items-center justify-center space-x-2 border-gray-100 border ${
                                      index === 0 ? "bg-primaryColor/70" : ""
                                    }`
                                  )}
                                  style={{
                                    backgroundColor:
                                      value && index > 0
                                        ? generateRandomColor(0.05)
                                        : "transparent",
                                  }}
                                >
                                  <p className="text-gray-800 line-clamp-2 text-xs ">
                                    {value || ""}
                                  </p>
                                </div>
                              </td>
                            ))}
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewMatrix;
