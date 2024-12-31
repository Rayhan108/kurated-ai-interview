"use client";

import MyButton from "@/components/shared/common/my-button";
import { MyLinkButton } from "@/components/shared/common/my-link-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import { Input, Select } from "antd";
import { BookText, FilePenLine, Plus, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PortfolioFilter() {
  const searchParams = useSearchParams();
  const storyType = searchParams.get(KeyConstant.STORY_TYPE);
  const router = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set(KeyConstant.STORY_TYPE, storyType || "EXTRACTED");
    if (search) {
      params.set(KeyConstant.query, search);
    } else {
      params.delete(KeyConstant.query);
    }

    router.push(`/storybank/story-portfolio?${params.toString()}`);
  }, [search]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="pt-4 pb-6">
      <div className="lg:flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <MyButton
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set(KeyConstant.STORY_TYPE, "EXTRACTED");

              router.push(`/storybank/story-portfolio?${params.toString()}`);
            }}
            variant={storyType === "EXTRACTED" ? "default" : "secondary"}
            startIcon={<BookText />}
            className="font-semibold w-full md:w-fit"
          >
            Stories from Resume
          </MyButton>
          <MyButton
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.set(KeyConstant.STORY_TYPE, "PERSONAL");

              router.push(`/storybank/story-portfolio?${params.toString()}`);
            }}
            variant={storyType === "PERSONAL" ? "default" : "secondary"}
            startIcon={<FilePenLine />}
            className="font-semibold w-full md:w-fit"
          >
            Personal Stories
          </MyButton>
        </div>
        <MySpacer className="h-2" />
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search Story..."
            prefix={<Search size={16} className="text-gray-400" />}
            className="rounded-full bg-transparent py-2 px-3 w-full lg:w-60"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            style={{ width: 130 }}
            onChange={handleChange}
            placeholder="Your Resume"
            options={[
              { value: "view", label: "View" },
              { value: "new-upload", label: "New Upload" },
              { value: "delete", label: "Delete" },
            ]}
          />
          <MyLinkButton
            href="/storybank/matrix?modal=true&step=1"
            className="bg-red-500 hover:bg-red-500/80 hidden lg:flex items-center gap-1 shadow-md"
          >
            <Plus size={18} /> Create New Story
          </MyLinkButton>
        </div>
        <div className="bg-white lg:hidden shadow p-2 fixed bottom-0 left-0 w-full">
          <MyLinkButton
            href="/storybank/matrix?modal=true&step=1"
            className="bg-red-500 hover:bg-red-500/80 flex items-center gap-1 shadow-md w-full justify-center"
          >
            <Plus size={18} /> Create New Story
          </MyLinkButton>
          {/* <MyButton
            startIcon={<Plus />}
            onClick={() => {}}
            className="bg-red-500  w-full text-center"
          >
            Create New Story
          </MyButton> */}
        </div>
      </div>
    </div>
  );
}

export default PortfolioFilter;
