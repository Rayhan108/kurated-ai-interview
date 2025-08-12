import MyButton from "@/components/shared/common/my-button";
import { DateUtil } from "@/lib/date.util";
import { X } from "lucide-react";
import { useState } from "react";
import { ExperienceModal } from "./experienc-view-modal";

function StoryPortfolioCard({ item, savedItem, refetch,setModal,openModal,isEditing,setIsEditing,setSelectedCardData,selectedCardData,setMatcingSaved,setMatcingSavedItem}) {

  console.log("item------------->", savedItem);
  console.log("item from card------------->", item);
  // const [openModal, setModal] = useState(false);

  const sections = item?.story_text
  ?.split("**")
  .map(s => s.trim())
  .filter(Boolean);
  console.log("Selection===>", sections);

  // Remove duplicates by keeping only the first occurrence of each section type

const seen = new Set();
const uniqueSections = sections.filter(section => {
  const heading = section.split(":")[0]?.trim(); 
  if (seen.has(heading)) return false;
  seen.add(heading);
  return true;
});
  console.log("unique Selection===>", uniqueSections);

  const handleClose = () =>{
  console.log("clicked");
     setModal(false)
     setIsEditing(false)
 
    };
const handleModalShow=()=>{
  setModal(true)
setSelectedCardData(item)
  if(!setIsEditing){
    setModal(false)

  }
  setSelectedCardData(item);      
    setMatcingSaved(savedItem);    
    setMatcingSavedItem(item);      
          
}
function extractHeadline(sections) {
  const headlineIndex = sections.findIndex(item => item.trim() === 'Headline:');
  if (headlineIndex !== -1 && headlineIndex + 1 < sections.length) {
    return sections[headlineIndex + 1].trim();
  }
  return '';
}

const headline = extractHeadline(sections);
console.log("heading------->",headline);
  return (
    <>
      <div
        className="space-y-3 border rounded-lg p-4 border-gray-300 shadow-sm hover:bg-primaryColor/30 hover:cursor-pointer"
        onClick={() => handleModalShow()}
      >

    <h1 className="text-lg font-semibold">
  {
 headline
//  ||
    // item?.story_heading
      ?.replace(/.*?Headline:\s*/, "") 
      ?.replace(/.*?Tackling Complexity:\s*/, "") 
      ?.slice(0, 100)
      .trim()
      .split(/###|\*\*/)}
</h1>
        {/* Story headline */}
        <h1 className=" text-base">
          {
          // item?.story_heading
            item?.story_text
              ?.slice(0, 100)
              .trim()
              .split(/###|\*\*/)}
        </h1>

    

        <p className="text-sm font-semibold ">
          Last Updated:{" "}
          <span className="font-bold">
            {DateUtil.formatOnlyDate(item?.updatedAt)}
          </span>
        </p>
      </div>


   {/* {openModal && (
        <div className=" fixed top-0 left-0 flex flex-1 w-full bg-gray-500/50 p-2 md:p-5 lg:p-10 h-screen z-50">
          <div className="bg-white h-full w-full lg:w-8/12 mx-auto rounded-lg pb-0 relative p-4">

            <div className="">
              <div className="py-2 px-2 absolute top-0 right-0 z-50">
                <MyButton
                  onClick={() => {
                    handleClose();
 
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
                isEditing={isEditing} setIsEditing={setIsEditing}
                setModal={setModal} openModal={openModal}
           selectedCardData={selectedCardData}
              />
            </div>
          </div>
        </div>
      )} */}
    </>
  );
}

export default StoryPortfolioCard;
