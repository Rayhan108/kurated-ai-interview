import { AllImages } from "@/assets/AllImages";
import { MyLinkButton } from "@/components/shared/common/my-link-button";
import MySpacer from "@/components/shared/common/my-spacer";
import Image from "next/image";
import StudyPlan from "./components/study-plan";

const OverViewPages = () => {
  return (
    <div>
      <div>
        <div className="md:flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src={AllImages.trophyIcon} alt="trophyIcon" />
            <h1 className="text-lg md:text-xl">
              Hey <span className="text-red-500 font-bold">Tom Cruise!</span>{" "}
              Let's Make Your Next Interview a Success!!
            </h1>
          </div>
          <MyLinkButton
            href={`/lesson-vault`}
            className="bg-red-400 hidden md:block w-[140px]"
          >
            Start Learning
          </MyLinkButton>
        </div>

        <MySpacer className="h-5" />
        <p>
          Welcome to Kurated Interview!
          <br />
          Kurated Interview is a complete interview prep guide that includes 14+
          hours of content, including 14 modules with over 70 lesson videos. You
          also have access to downloadable worksheets to guide your work and
          progress. bf Explore the course curriculum and choose from our 1-week,
          6-week, or 12-week playlists, tailored to your current stage in the
          interviewing process.
        </p>
      </div>

      <MySpacer className="h-5" />
      <div>
        <StudyPlan />
      </div>

      <MySpacer className="h-16 md:h-0" />
      <div className="bg-white shadow p-2 fixed bottom-0 left-0 w-full">
        <MyLinkButton
          href="/lesson-vault"
          className="bg-red-400 md:hidden w-full text-center uppercase"
        >
          Start Here
        </MyLinkButton>
      </div>
    </div>
  );
};

export default OverViewPages;
