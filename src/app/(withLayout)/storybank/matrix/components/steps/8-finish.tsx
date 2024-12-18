import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { CheckCheck, CircleCheckBig } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export const Finish = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  return (
    <div>
      <div>
        <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto place-content-center py-10">
            <div className="md:w-3/4 mx-auto space-y-12">
              <div>
                <p className="font-semibold text-gray-600 py-3 text-xl md:text-2xl text-center">
                  Your stories have been successfully saved!
                </p>
                <p className="font-semibold text-sm text-center">
                  View your stories in the Interview Matrix
                </p>
              </div>

              <Image
                src={AllImages.CloudCheck}
                alt="check"
                className="mx-auto"
              />
              <p className="font-semibold text-gray-600 py-3 text-xl md:text-2xl text-center">
                Do you want to create more stories?
              </p>
            </div>
          </div>

          <div className="border-t p-3 w-full bg-white">
            <div>
              <div className="flex items-center gap-2 justify-center">
                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString());
                    //   params.set(KeyConstant.STEP, `${Number(step) - 1}`);
                    params.delete(KeyConstant.SUCCESS);

                    router.push(`/storybank/matrix`);
                  }}
                  variant="outline"
                  startIcon={<CircleCheckBig />}
                  className="border-black"
                >
                  No, go to my Interview Matrix
                </MyButton>
                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString()); // Clone existing params

                    params.set(KeyConstant.STEP, "3");
                    // params.set(KeyConstant.STEP, "5");
                    params.delete(KeyConstant.SUCCESS);

                    router.push(`?${params.toString()}`);
                  }}
                  variant="outline"
                  endIcon={<CheckCheck />}
                  className="text-green-500 border-green-500"
                >
                  Yes
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
