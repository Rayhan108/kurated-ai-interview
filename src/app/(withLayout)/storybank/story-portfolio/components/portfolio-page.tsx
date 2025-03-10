"use client";

import { KeyConstant } from "@/constants/key.constant";
import {
  useGetPortfolioExperienceQuery,
  useGetSavedStoryQuery,
} from "@/redux/feature/storybank/storybank-api";
import { useSearchParams } from "next/navigation";
import PortfolioFilter from "./portfolio-filter";
import StoryPortfolioCard from "./story-portfolio-card";

const PortfolioPage = () => {
  const searchParams = useSearchParams();
  const storyType = searchParams.get(KeyConstant.STORY_TYPE);
  const query = searchParams.get(KeyConstant.query);

  const { data: portfolioExperience } = useGetPortfolioExperienceQuery(undefined);
  const { data: savedStory } = useGetSavedStoryQuery(undefined);

  // Filter portfolio experience by storyType
  const filteredExperience = portfolioExperience?.data?.response?.filter(
    (item) => item.type === storyType
  );

  // Filter saved stories by storyType
  const savedExperience = savedStory?.data?.response?.filter(
    (item) => item.experience_info.type === storyType
  );

  return (
    <div>
      <PortfolioFilter />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredExperience?.map((item, idx) => {
          // Find matching saved story for this experience item
          const matchingSaved = savedExperience?.find(
            (savedItem: any) => savedItem.experience_info.id === item.id
          );

          return (
            <StoryPortfolioCard key={idx} item={item} savedItem={matchingSaved} />
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
