"use client";

import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import { CheckCircleFilled } from "@ant-design/icons";
import { Collapse, Drawer, Space } from "antd";
import { ChevronDown, ListVideo } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const LessonsList = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="fixed bottom-4 left-0 px-4 w-full md:hidden">
        <div
          onClick={() => setOpen(true)}
          className="bg-[#f0bc4d] p-3 rounded-lg "
        >
          <div className="flex justify-between">
            <div className="flex gap-2 items-center font-medium">
              <ListVideo size={18} /> The Recruiting
            </div>
            <ChevronDown />
          </div>
          <span className="font-medium text-[10px] text-gray-700">4:32</span>
        </div>
      </div>

      <Drawer
        title={
          <p className="flex items-center gap-2">
            <Image src={AllImages.starIcon} alt="starIcon" /> Lesson Vault
          </p>
        }
        placement={"bottom"}
        height={"100vh"}
        closable={false}
        open={open}
        extra={
          <Space>
            <MyButton variant="secondary" onClick={() => setOpen(false)}>
              Collapse <ChevronDown />
            </MyButton>
          </Space>
        }
      >
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <Collapse
              expandIconPosition="right"
              className="border-0 rounded-lg bg-primaryColor/40"
              //   defaultActiveKey={1}
              items={[
                {
                  key: item.toString(),
                  label: (
                    <div>
                      <div className="flex gap-2 items-center font-medium">
                        <ListVideo size={18} /> The Recruiting {item}
                      </div>
                      <span className="font-medium text-[10px] text-gray-700">
                        4:32
                      </span>
                    </div>
                  ),
                  children: (
                    <div className=" divide-y">
                      {[1, 2, 3].map((item) => (
                        <div className="space-y-1.5 hover:bg-gray-50 hover:cursor-pointer p-2">
                          <span className="text-gray-600 uppercase text-[10px] font-semibold">
                            Video
                          </span>

                          <h1 className="text-sm font-semibold leading-tight">
                            The Kurated Approach to recruiting and interviewing
                          </h1>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-[10px] text-gray-500">
                              4 mins
                            </span>
                            <CheckCircleFilled className="text-green-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          ))}
        </div>
      </Drawer>

      <div className="space-y-2 hidden md:block">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Collapse
            expandIconPosition="right"
            className="border-0 rounded-lg bg-primaryColor/40"
            defaultActiveKey={1}
            items={[
              {
                key: item.toString(),
                label: (
                  <div>
                    <div className="flex gap-2 items-center font-medium">
                      <ListVideo size={18} /> The Recruiting {item}
                    </div>
                    <span className="font-medium text-[10px] text-gray-700">
                      4:32
                    </span>
                  </div>
                ),
                children: (
                  <div className=" divide-y">
                    {[1, 2, 3].map((item) => (
                      <div className="space-y-1.5 hover:bg-gray-50 hover:cursor-pointer p-2">
                        <span className="text-gray-600 uppercase text-[10px] font-semibold">
                          Video
                        </span>

                        <h1 className="text-sm font-semibold leading-tight">
                          The Kurated Approach to recruiting and interviewing
                        </h1>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[10px] text-gray-500">
                            4 mins
                          </span>
                          <CheckCircleFilled className="text-green-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};
