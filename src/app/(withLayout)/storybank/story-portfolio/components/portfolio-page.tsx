"use client";

import { KeyConstant } from "@/constants/key.constant";
import { useGetPortfolioExperienceQuery } from "@/redux/feature/storybank/storybank-api";
import { useSearchParams } from "next/navigation";
import PortfolioFilter from "./portfolio-filter";
import StoryPortfolioCard from "./story-portfolio-card";

const PortfolioPage = () => {
  const searchParams = useSearchParams();
  const storyType = searchParams.get(KeyConstant.STORY_TYPE);
  const query = searchParams.get(KeyConstant.query);

  const { data: portfolioExperience, isLoading } =
    useGetPortfolioExperienceQuery(undefined);

  const filteredPortfolioExperience =
    portfolioExperience?.data?.response?.filter(
      (item) => item.type === storyType
    );
  return (
    <div>
      <PortfolioFilter />
      {/* <MySpacer className="h-8" /> */}

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPortfolioExperience?.map((item) => (
          <StoryPortfolioCard item={item} />
        ))}
      </div>

      {filteredPortfolioExperience?.length < 1 && (
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
