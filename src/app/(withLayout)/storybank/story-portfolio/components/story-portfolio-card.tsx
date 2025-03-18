import MyButton from "@/components/shared/common/my-button";
import { DateUtil } from "@/lib/date.util";
import { X } from "lucide-react";
import { useState } from "react";
import { ExperienceModal } from "./experienc-view-modal";

function StoryPortfolioCard({ item, savedItem, refetch }) {
  const [openModal, setModal] = useState(false);
  const handleClose = () => setModal(false);

  return (
    <>
      <div
        className="space-y-3 border rounded-lg p-4 border-gray-300 shadow-sm hover:bg-primaryColor/30 hover:cursor-pointer"
        onClick={() => setModal(true)}
      >
        <h1 className=" text-base">{item?.story_text?.slice(0,100).trim().split("**")}</h1>

        {/* <p className="text-gray-700 text-xs md:text-sm line-clamp-3">
          {item?.description}
        </p> */}

        <p className="text-sm font-semibold ">
          Last Updated:{" "}
          <span className="font-bold">
            {DateUtil.formatOnlyDate(item?.updatedAt)}
          </span>
        </p>
      </div>

      {openModal && (
        <div className=" fixed top-0 left-0 flex flex-1 w-full bg-gray-500/50 p-2 md:p-5 lg:p-10 h-screen z-50">
          <div className="bg-white h-full w-full lg:w-8/12 mx-auto rounded-lg pb-0 relative p-4">
            {/* <div className="flex flex-col h-full place-content-center"> */}
            <div className="">
              <div className="py-2 px-2 absolute top-0 right-0 z-50">
                <MyButton
                  onClick={() => {
                    setModal(false);
                    // const params = new URLSearchParams(searchParams.toString()); // Clone existing params
                    // params.delete(KeyConstant.MODAL);
                    // params.delete(KeyConstant.STEP);
                    // localStorage.removeItem(KeyConstant.SELECTED_ROLE_TOPICS);
                    // localStorage.removeItem(KeyConstant.SELECTED_EXPERIENCE);
                    // localStorage.removeItem(KeyConstant.SELECTED_RELEVANCE);
                    // localStorage.removeItem(KeyConstant.PARSED_EXPERIENCE);
                    // localStorage.removeItem(KeyConstant.CRAFTING_TYPE);
                    // router.push(`?${params.toString()}`);
                  }}
                  variant="ghost"
                  className=""
                >
                  <X />
                </MyButton>
              </div>

              <ExperienceModal
              
                data={item}
                savedItem={savedItem}
                refetch={refetch}
                handleClose={handleClose}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StoryPortfolioCard;
