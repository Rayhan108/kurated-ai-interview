import { AllImages } from "@/assets/AllImages";
import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { useGetParsedResumeMutation } from "@/redux/feature/storybank/storybank-api";
import { message, Upload } from "antd";
import { CloudCog, CornerUpRight, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { useLocalStorage } from "usehooks-ts";
const { Dragger } = Upload;

export const UploadResume = () => {
  const searchParam = useSearchParams();
  
  const router = useRouter();
  const success = searchParam.get(KeyConstant.SUCCESS);

  const [experienceLocal, setExperienceLocal] = useLocalStorage(
    KeyConstant.PARSED_EXPERIENCE,
    null
  );

  const [getParsedResume, { isLoading }] = useGetParsedResumeMutation();

  const onChange = (info: any) => {
    //   const params = new URLSearchParams(searchParam.toString()); // Clone existing params
    console.log("from on change handler")
    console.log(info.file.status    )
    if (info.file.status === "done") {
      getParsedResume(info.file.originFileObj)
        .unwrap()
        .then((res) => {
          console.log(res?.data?.result?.work_experience)
          setExperienceLocal(res?.data?.result?.work_experience);
        })
        .catch((err) => {
          message.error(err?.data?.message);
        });
    }
    //   params.set(KeyConstant.SUCCESS, "true");
    //   router.push(`?${params.toString()}`);
  };

  return (
    <div>
      {success ? (
        <div>
          <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
            <div className="flex-1 overflow-y-auto place-content-center py-10">
              <div className="md:w-3/4 mx-auto space-y-8">
                <p className="font-semibold text-gray-600 py-3 text-xl md:text-2xl text-center">
                  Your resume has been saved!
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
                      );
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
                      );

                      params.set(KeyConstant.STEP, "5");
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
              Upload Your Resume
            </p>

            <div className="md:w-3/4 mx-auto">
              <p className="font-semibold text-gray-600 py-3">
                Upload either DOC, DOCX, HTML, PDF, or TXT file types (5MB max)
              </p>
              <Dragger
                name="resume"
                multiple={false}
                action="#" // Prevents automatic upload
                showUploadList={true} // Show file list
                beforeUpload={(file) => {
                  console.log("🔄 Before upload triggered:", file);
                
                  return true;
                }}
                onChange={onChange}
                // onDrop={(e) => console.log("File dropped:", e.dataTransfer.files)}
              
              
                
                className="w-80 z-10 font-mulish"
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
                {isLoading && (
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <Loader className="animate-spin" />
                    <p>Parsing your resume...</p>
                  </div>
                )}
                {experienceLocal && !isLoading && (
                  <div className="flex items-center justify-center gap-2 text-green-500 text-lg font-medium">
                    <p>Resume parsed!</p>
                  </div>
                )}
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
                  disabled={!experienceLocal}
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
