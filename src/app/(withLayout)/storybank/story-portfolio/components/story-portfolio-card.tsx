function StoryPortfolioCard() {
  return (
    <div>
      <div className="space-y-3 border rounded-lg p-4 border-gray-300 shadow-sm">
        <h1 className="font-bold text-base">Experience Title</h1>

        <p className="text-gray-700 text-xs md:text-sm line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio a autem
          asperiores repudiandae optio quod quaerat ipsa natus.
        </p>

        <p className="text-sm font-semibold">
          Last Updated: <span className="font-bold">July 24, 2024</span>
        </p>
      </div>
    </div>
  );
}

export default StoryPortfolioCard;
