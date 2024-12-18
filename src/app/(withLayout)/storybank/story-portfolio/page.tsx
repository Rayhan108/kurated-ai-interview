"use client";

import PortfolioFilter from "./components/portfolio-filter";
import StoryPortfolioCard from "./components/story-portfolio-card";

const data = [1, 2];
const StoryPortfolioPage = () => {
  return (
    <div>
      <PortfolioFilter />
      {/* <MySpacer className="h-8" /> */}

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <StoryPortfolioCard />
        ))}
      </div>

      {data.length < 1 && (
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

export default StoryPortfolioPage;
