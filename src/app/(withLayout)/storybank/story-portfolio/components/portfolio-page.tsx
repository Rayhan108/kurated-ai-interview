"use client";

import { KeyConstant } from "@/constants/key.constant";
import {
  useGetPortfolioExperienceQuery,
  useGetSavedStoryQuery,
  useSearchSavedStoryQuery,
} from "@/redux/feature/storybank/storybank-api";
import { useSearchParams } from "next/navigation";
import PortfolioFilter from "./portfolio-filter";
import StoryPortfolioCard from "./story-portfolio-card";
import { useState } from "react";
import { CloudCog } from "lucide-react";

const PortfolioPage = () => {
  const searchParams = useSearchParams();
  const storyType = searchParams.get(KeyConstant.STORY_TYPE);
  const query = searchParams.get(KeyConstant.query);
const [searchKeyword,setSearchKeyword]=useState("")
const { data: stories } = useSearchSavedStoryQuery(searchKeyword ? searchKeyword : undefined,{ skip: !searchKeyword });
  const { data: portfolioExperience } = useGetPortfolioExperienceQuery(undefined);
  const { data: savedStory,refetch } = useGetSavedStoryQuery(undefined);

  // Filter portfolio experience by storyType
  const filteredExperience = portfolioExperience?.data?.response?.filter(
    (item) => item.type === storyType
  );
  // console.log("search result",stories)
  // Filter saved stories by storyType
  const savedExperience = savedStory?.data?.response?.filter(
    (item) => item.experience_info.type === storyType
  );
  const handleSearch = (keyword: string) => {
    // console.log("search keywords",keyword)
    setSearchKeyword(keyword); // Assuming searchKeyword state is in the parent
  };
  return (
    <div>
      <PortfolioFilter  onSearch={handleSearch}/>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
       
        {/* {filteredExperience?.map((item, idx) => {
      
          const matchingSaved = savedExperience?.find(
            (savedItem: any) => savedItem.experience_info.id === item.id
          );

          return (
            <StoryPortfolioCard key={idx} item={item} savedItem={matchingSaved} refetch={refetch} />
          );
        })} */}


{searchKeyword && stories?.data?.response?.length > 0
    ? stories.data.response.map((story, idx) => (
        <StoryPortfolioCard key={idx} item={story} savedItem={story} refetch={refetch} />
      ))
    : filteredExperience?.map((item, idx) => {
        const matchingSaved = savedExperience?.find(
          (savedItem: any) => savedItem.experience_info.id === item.id
        );
        return (
          <StoryPortfolioCard key={idx} item={item} savedItem={matchingSaved} refetch={refetch} />
        );
      })}



      </div>

      {filteredExperience?.length === 0 && (
        <div className="h-[calc(100vh-230px)] flex justify-center items-center">
          <p className="text-gray-400 text-center">
            Click on “+ Create New Story” to start crafting your own personal
            story
          </p>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
