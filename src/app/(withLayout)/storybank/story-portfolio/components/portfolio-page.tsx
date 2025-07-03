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
import { useAppSelector } from "@/redux/hooks";
import { useCurrentSearchText } from "@/redux/feature/storybank/storybankSlice";
import { useState } from "react";
import MyButton from "@/components/shared/common/my-button";
import { X } from "lucide-react";
import { ExperienceModal } from "./experienc-view-modal";

const PortfolioPage = () => {
const [selectedCardData, setSelectedCardData] = useState(null); // To store selected card data
const [matchingSaved,setMatcingSaved]=useState(null)
const [matchingSavedItem,setMatcingSavedItem]=useState(null)
  const searchParams = useSearchParams();
  const [openModal, setModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // console.log("search params===>",searchParams);
  const storyType = searchParams.get(KeyConstant.STORY_TYPE);
  const query = searchParams.get("story_type");
  const search = searchParams.get("search");
  console.log("search param:", search);
  // console.log("query", query);

  const { data: portfolioExperience } =
    useGetPortfolioExperienceQuery(undefined);
  const { data: savedStory, refetch } = useGetSavedStoryQuery(undefined);

  const storyTypeData = savedStory?.data?.response?.map(
    (item) => item.story_text?.trim().split("**")
  );
  const storyTypeDataHeadline= storyTypeData?.map((item) => item?.map((item2) => item2?.trim())[4]);
  // console.log("savedStory", savedStory?.data?.response?.length);


// search DATA queries

const { data: searchSavedStory, isLoading } = useSearchSavedStoryQuery(search);
const searchData = searchSavedStory?.data?.response
console.log("searchSavedStory ======>>>>>>>", searchData);


  const handleClose = () =>{
  console.log("clicked");
     setModal(false)
     setIsEditing(false)
 
    };


  // Filter portfolio experience by storyType
  const filteredExperience = portfolioExperience?.data?.response?.filter(
    (item) => item.type === query
  );


  console.log("filteredExperience", filteredExperience);

  // Filter saved stories by storyType
  const savedExperience = savedStory?.data?.response?.filter(
    (item) => item.experience_info.type === query
  );

  console.log("savedExperience", savedExperience);



  return (
    <div>
      <PortfolioFilter setModal={setModal} openModal={openModal} isEditing={isEditing} setIsEditing={setIsEditing}/>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* // Find matching saved story for this experience item */}
        {search ? (
  searchData?.length > 0 ? (
    searchData.map((item, idx) => {
      const matchingSaved = filteredExperience?.find(
        (savedItem: any) => item?.experience_info?._id === savedItem?._id
      );

      return (
        <StoryPortfolioCard
          key={idx}
          item={item}
          savedItem={matchingSaved}
          refetch={refetch}
          setModal={setModal} openModal={openModal}
          isEditing={isEditing} setIsEditing={setIsEditing}
          setSelectedCardData={setSelectedCardData} selectedCardData={undefined}      setMatcingSaved={setMatcingSaved}
  setMatcingSavedItem={setMatcingSavedItem}    />
      );
    })
  ) : (
    <p className="text-gray-500 text-center mt-4 col-span-full">
      No matching stories found.
    </p>
  )
) : (
  savedExperience?.map((item, idx) => {
    const matchingSave = filteredExperience?.find(
      (savedItem: any) => item?.experience_info?._id === savedItem?._id
    );
 // Log to ensure the matching logic works
  console.log('Matching item:', matchingSave);

  console.log('item from source - :=============>', item);
    return (
      <StoryPortfolioCard
      
        key={idx}
        item={item}
        savedItem={matchingSave}
        refetch={refetch}
        setModal={setModal} openModal={openModal}
        isEditing={isEditing} setIsEditing={setIsEditing}
      setSelectedCardData={setSelectedCardData}
      selectedCardData={selectedCardData}
  setMatcingSaved={setMatcingSaved}
  setMatcingSavedItem={setMatcingSavedItem}
      
      />
    );



    
  })
)}

      </div>

      {filteredExperience?.length === 0 && (
        <div className="h-[calc(100vh-230px)] flex justify-center items-center">
          <p className="text-gray-400 text-center">
            Click on “+ Create New Story” to start crafting your own personal
            story
          </p>
        </div>
      )}




   {openModal && (
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
                data={matchingSavedItem}
                savedItem={matchingSaved}
                refetch={refetch}
                handleClose={handleClose}
                isEditing={isEditing} setIsEditing={setIsEditing}
                setModal={setModal} openModal={openModal}
           selectedCardData={selectedCardData}
              />
            </div>
          </div>
        </div>
      )} 





    </div>
  );
};

export default PortfolioPage;
