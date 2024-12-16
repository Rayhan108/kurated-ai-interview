import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import { Radio } from "antd";
import { CornerUpRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Roles() {
  const searchParam = useSearchParams();
  const router = useRouter();
  return (
    <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
      <div className="flex-1 overflow-y-auto place-content-center py-10">
        <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
          Select Your Target Role
        </p>

        <div className="md:w-3/4 mx-auto">
          <p className="font-semibold mb-3">Target Role (Choose one)</p>
          <div>
            <Radio.Group className="grid grid-cols-2">
              {[
                {
                  label: "Consulting",
                  value: "consulting",
                },
                {
                  label: "Data Science",
                  value: "data-science",
                },
                {
                  label: "Data Science",
                  value: "data-science",
                },
                {
                  label: "Data Science",
                  value: "data-science",
                },
                {
                  label: "Data Science",
                  value: "data-science",
                },
              ].map((item) => (
                <Radio value={item.value}> {item.label}</Radio>
              ))}
            </Radio.Group>
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
            <MyButton
              onClick={() => {
                const params = new URLSearchParams(searchParam.toString()); // Clone existing params

                params.set(KeyConstant.STEP, "3");

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
  );
}
