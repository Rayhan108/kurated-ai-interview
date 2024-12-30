import { DateUtil } from "@/lib/date.util";

function StoryPortfolioCard({ item }) {
  return (
    <div className="space-y-3 border rounded-lg p-4 border-gray-300 shadow-sm hover:bg-primaryColor/30 hover:cursor-pointer">
      <h1 className="font-bold text-base">{item?.title}</h1>

      <p className="text-gray-700 text-xs md:text-sm line-clamp-3">
        {item?.description}
      </p>

      <p className="text-sm font-semibold">
        Last Updated:{" "}
        <span className="font-bold">
          {DateUtil.formatOnlyDate(item?.updatedAt)}
        </span>
      </p>
    </div>
  );
}

export default StoryPortfolioCard;
