import { AllImages } from "@/assets/AllImages";
import MySpacer from "@/components/shared/common/my-spacer";
import Image from "next/image";
import LessonDetails from "./components/lesson-details";
import { LessonsList } from "./components/lessons-list";
const LessonPage = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Image src={AllImages.starIcon} alt="starIcon" />{" "}
        <p className="font-bold text-xl">Lesson Vault</p>
      </div>
      <MySpacer className="h-4" />
      <div className="md:grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <LessonDetails />
        </div>

        <div className="col-span-1 relative">
          <LessonsList />
        </div>
      </div>
      <MySpacer className="h-20" />
    </div>
  );
};

export default LessonPage;
