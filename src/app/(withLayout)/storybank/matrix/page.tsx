import { MyLinkButton } from "@/components/shared/common/my-link-button";
import { Plus } from "lucide-react";
import InterviewMatrix from "./components/intervew-matrix";

const data = [];
function MatrixPage() {
  return (
    <div>
      {data.length ? (
        <InterviewMatrix />
      ) : (
        <div className="h-[calc(100vh-230px)] flex justify-center items-center">
          <div className="space-y-2">
            <p className="text-gray-400 text-center">
              Get Started with the Onboarding Process and create your first
              story
            </p>
            <div className="w-fit mx-auto">
              <MyLinkButton
                href="/"
                className="bg-red-500 flex gap-1 items-center shadow-md hover:bg-red-500/80 "
              >
                <Plus size={16} /> Start Creating your New Story
              </MyLinkButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatrixPage;
