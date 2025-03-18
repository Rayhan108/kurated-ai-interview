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
  const query = searchParams.get("story_type");
  // console.log("query", query);

  const { data: portfolioExperience } =
    useGetPortfolioExperienceQuery(undefined);
  const { data: savedStory, refetch } = useGetSavedStoryQuery(undefined);

  const storyTypeData = savedStory?.data?.response?.map(
    (item) => item.story_text?.trim().split("**")
  );
  const storyTypeDataHeadline= storyTypeData?.map((item) => item?.map((item2) => item2?.trim())[4]);
  // console.log("savedStory", savedStory?.data?.response?.length);



  // Filter portfolio experience by storyType
  const filteredExperience = portfolioExperience?.data?.response?.filter(
    (item) => item.type === query
  );


  // console.log("filteredExperience", filteredExperience?.length);

  // Filter saved stories by storyType
  const savedExperience = savedStory?.data?.response?.filter(
    (item) => item.experience_info.type === query
  );

  



  return (
    <div>
      <PortfolioFilter />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* // Find matching saved story for this experience item */}
        {savedExperience?.map((item, idx) => {
          const matchingSaved = filteredExperience?.find(
            (savedItem: any) => item?.experience_info?._id === savedItem?._id

          )
          // console.log("matchingSaved", matchingSaved);

          return (
            <StoryPortfolioCard
              key={idx}
              item={item}
              
              savedItem={matchingSaved}
              refetch={refetch}
            />
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
