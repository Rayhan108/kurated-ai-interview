import { AllImages } from "@/assets/AllImages";
import Image from "next/image";

export const Finish = () => {
  return (
    <div>
      <div>
        <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto place-content-center py-10">
            <div className="md:w-3/4 mx-auto space-y-8">
              <div>
                <p className="font-semibold text-gray-600 py-3 text-2xl text-center">
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
            </div>
          </div>

          {/* <div className="border-t p-3 w-full bg-white">
              <div className="float-right">
                <div className="space-x-2">
                  <MyButton
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParam.toString()
                      );
                      //   params.set(KeyConstant.STEP, `${Number(step) - 1}`);
                      params.delete(KeyConstant.SUCCESS);

                      router.push(`?${params.toString()}`);
                    }}
                    variant="ghost"
                  >
                    Back
                  </MyButton>
                  <MyButton
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParam.toString()
                      ); // Clone existing params

                      params.set(KeyConstant.STEP, "7");
                      // params.set(KeyConstant.STEP, "5");
                      params.delete(KeyConstant.SUCCESS);

                      router.push(`?${params.toString()}`);
                    }}
                    variant="outline"
                    endIcon={<CornerUpRight />}
                  >
                    Next
                  </MyButton>
                </div>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};
