import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import MySpacer from "@/components/shared/common/my-spacer";
import { KeyConstant } from "@/constants/key.constant";
import { Upload } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
const { Dragger } = Upload;

export const UploadExperience = () => {
  const searchParam = useSearchParams();
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
        <div className="flex-1 overflow-y-auto place-content-center py-10">
          <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
            Upload Your Experiences
          </p>

          <div className="md:w-3/4 mx-auto">
            <div>
              <div className="flex grid-cols-2 justify-center items-center gap-4">
                <div
                  className="border border-dashed border-gray-300 rounded-lg bg-gray-50 p-10 place-content-center w-80 h-64 relative hover:cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString()); // Clone existing params
                    // const step = params.get(KeyConstant.STEP);
                    params.set(KeyConstant.STEP, `4`);

                    router.push(`?${params.toString()}`);
                  }}
                >
                  <div>
                    <p className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-[#E3F9D1] border border-[#5CAC48] py-2 px-4 rounded-md uppercase text-[#5CAC48] font-medium tracking-widest text-xs md:text-sm">
                      Recommended!
                    </p>
                    <p className="mx-auto text-center">
                      <Image
                        src={AllImages.editIcon}
                        alt="edit"
                        className="mx-auto"
                      />
                    </p>
                    <p className="text-gray-500 font-semibold py-2 text-center">
                      Craft Story from your Resume
                    </p>
                  </div>
                </div>

                <div
                  className="border border-dashed border-gray-300 rounded-lg bg-gray-50 p-10 place-content-center w-80 h-64 hover:cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString()); // Clone existing params
                    // const step = params.get(KeyConstant.STEP);
                    params.set(KeyConstant.STEP, `6`);

                    router.push(`?${params.toString()}`);
                  }}
                >
                  <div>
                    <p className="mx-auto text-center">
                      <Image
                        src={AllImages.note}
                        alt="edit"
                        className="mx-auto"
                      />
                    </p>
                    <p className="text-gray-500 font-semibold py-2 text-center">
                      Craft Story from an Additional Experience
                    </p>
                  </div>
                </div>
              </div>

              <MySpacer className="h-10" />
              <p className="text-gray-600 font-semibold text-center">
                We recommend starting by uploading your resume to maximize the
                number of experiences captured, giving you the most flexibility
                while crafting stories. However, if you want to craft stories
                from a particular experience that is not on your resume, choose
                “Craft Story from an Additional Experience”
              </p>
            </div>
          </div>
        </div>

        <div className="border-t p-3 w-full bg-white">
          <div className="float-right">
            <div className="space-x-2">
              <MyButton
                onClick={() => {
                  const params = new URLSearchParams(searchParam.toString()); // Clone existing params
                  const step = params.get(KeyConstant.STEP);
                  params.set(KeyConstant.STEP, `${Number(step) - 1}`);

                  router.push(`?${params.toString()}`);
                }}
                variant="ghost"
              >
                Back
              </MyButton>
              {/* <MyButton
                onClick={() => {
                  const params = new URLSearchParams(searchParam.toString()); // Clone existing params

                  params.set(KeyConstant.STEP, "3");

                  router.push(`?${params.toString()}`);
                }}
                variant="outline"
                endIcon={<CornerUpRight />}
              >
                Next
              </MyButton> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
