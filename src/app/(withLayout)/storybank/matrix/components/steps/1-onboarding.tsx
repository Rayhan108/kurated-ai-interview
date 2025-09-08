import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
const onboardingData = [
  {
    id: 1,
    title: "Select Your Target Role & Upload Your Achievements",
    description:
      "Start by selecting your target job function and uploading your resume or additional experiences that are not captured on your resume.",
  },
  {
    id: 2,
    title: "Map Experiences to Expected Interview Questions",
    description:
      "Based on your inputs, we'll suggest how your experiences best fit with predicted interview topics for your target job role.",
  },
  {
    id: 3,
    title: "Kurate and Refine Your Stories",
    description:
      "We'll turn your experiences into interview-ready stories using our proven framework, with options to edit and regenerate until you're satisfied.",
  },
  {
    id: 4,
    title: "View Your Interview Matrix",
    description:
      "Finally, access your saved stories in our Interview Matrix, allowing you to practice your responses and ensure you are ready for every question. ",
  },
];
export const Onboarding = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)] ">
      <div className="flex-1 overflow-y-auto place-content-center py-10">
        <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg">
          Let's Get Started!
        </p>

        <div className="text-center">
          <p className="font-semibold text-base">Welcome to</p>
          <h2 className="text-4xl font-bold">
            Kurated <span className="text-primaryColor">Storybank!</span>
          </h2>
        </div>

        <MySpacer className="h-16" />
        <div className="px-5 lg:px-20">
          <p className="font-bold mb-2">
            We're excited to help you craft compelling stories for your
            interviews. Here's what to expect:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {onboardingData.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg border p-5">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-4xl font-semibold text-red-400 font-sans">
                      {item.id}
                    </span>
                    <p>{item.title}</p>
                  </div>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MySpacer className="h-16" />
      </div>

      <div className="border-t p-3 w-full bg-white">
        <div className="text-center">
          <MyButton
            variant="outline"
            endIcon={<ArrowRight />}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString()); // Clone existing params
              localStorage.removeItem(KeyConstant.SELECTED_ROLE_TOPICS);
              localStorage.removeItem(KeyConstant.SELECTED_EXPERIENCE);
              localStorage.removeItem(KeyConstant.SELECTED_RELEVANCE);
              localStorage.removeItem(KeyConstant.PARSED_EXPERIENCE);
              params.set(KeyConstant.STEP, "2");

              router.push(`?${params.toString()}`);
            }}
            className="border-black"
          >
            Get Started
          </MyButton>
        </div>
      </div>
    </div>
  );
};
