import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { message, Upload } from "antd";
import { CornerUpRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
const { Dragger } = Upload;

export const SuccessStep = () => {
  const searchParam = useSearchParams();
  const router = useRouter();

  const onChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const onDrop = (e: any) => {
    console.log("Dropped files", e.dataTransfer.files);
  };
  return (
    <div>
      <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
        <div className="flex-1 overflow-y-auto place-content-center py-10">
          <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
            Upload Your Experiences
          </p>
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

                  params.set(KeyConstant.STEP, "5");

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
  );
};
