import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { message, Upload } from "antd";
import { CornerUpRight } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowDownCircleOutline } from "react-icons/io5";
const { Dragger } = Upload;

export const UploadResume = () => {
  const searchParam = useSearchParams();
  const router = useRouter();

  const success = searchParam.get(KeyConstant.SUCCESS);

  const onChange = (info: any) => {
    if (info.file.status === "done") {
      //   const params = new URLSearchParams(searchParam.toString()); // Clone existing params

      message.success(`${info.file.name} file uploaded successfully.`);
      //   params.set(KeyConstant.SUCCESS, "true");
      //   router.push(`?${params.toString()}`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onDrop = (e: any) => {
    console.log("Dropped files", e.dataTransfer.files);
  };
  return (
    <div>
      {success ? (
        <div>
          <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto place-content-center py-10">
              <div className="md:w-3/4 mx-auto space-y-8">
                <p className="font-semibold text-gray-600 py-3 text-2xl text-center">
                  Great! Your Resume is now saved in our Dashboard!
                </p>

                <Image
                  src={AllImages.checkIcon}
                  alt="check"
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="border-t p-3 w-full bg-white">
              <div className="float-right">
                <div className="space-x-2">
                  <MyButton
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParam.toString()
                      ); // Clone existing params
                      const step = params.get(KeyConstant.STEP);
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

                      params.set(KeyConstant.STEP, "5");
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
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
          <div className="flex-1 overflow-y-auto place-content-center py-10">
            <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
              Upload Your Experiences
            </p>

            <div className="md:w-3/4 mx-auto">
              <p className="font-semibold text-gray-600 py-3">
                Upload either DOC, DOCX, HTML, PDF, or TXT file types (5MB max)
              </p>
              <Dragger
                name="resume"
                multiple={false}
                onChange={onChange}
                onDrop={onDrop}
                // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                className="w-80 z-10"
              >
                <div className="text-gray-500 font-semibold space-y-3 p-10">
                  <IoArrowDownCircleOutline
                    size={50}
                    className="text-primaryColor mx-auto"
                  />
                  <p>Drop here</p>
                  <p>OR</p>
                  <p className="text-primaryColor underline">Select File</p>
                </div>
              </Dragger>
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
                <MyButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParam.toString()); // Clone existing params

                    params.set(KeyConstant.SUCCESS, "true");
                    // params.set(KeyConstant.STEP, "5");

                    router.push(`?${params.toString()}`);
                  }}
                  variant="outline"
                  endIcon={<CornerUpRight />}
                >
                  Next
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
