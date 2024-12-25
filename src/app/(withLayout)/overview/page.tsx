import { MyLinkButton } from "@/components/shared/common/my-link-button";
import MySpacer from "@/components/shared/common/my-spacer";
import StudyPlan from "./components/study-plan";

const OverViewPages = () => {
  return (
    <div>
      <StudyPlan />

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
