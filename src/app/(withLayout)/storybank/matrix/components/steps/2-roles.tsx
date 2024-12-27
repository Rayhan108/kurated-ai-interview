import MyButton from "@/components/shared/common/my-button";
import { KeyConstant } from "@/constants/key.constant";
import {
  useGetAllStorybankRoleQuery,
  useGetSingleStorybankRoleQuery,
} from "@/redux/feature/storybank/storybank-api";
import { Radio } from "antd";
import { CornerUpRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function Roles() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [, setSelectedRoleTopics] = useLocalStorage(
    KeyConstant.SELECTED_ROLE_TOPICS,
    null
  );

  const [selectedRole, setSelectedRole] = useState(null);

  const { data: roles, isLoading } = useGetAllStorybankRoleQuery(undefined);

  const rolesList = roles?.data?.response?.map((item) => {
    return {
      label: item.role_name,
      value: item._id,
    };
  });

  const roleOnChangeHandler = (value) => {
    setSelectedRole(value);
  };

  const { data: singleRole } = useGetSingleStorybankRoleQuery(selectedRole);

  useEffect(() => {
    const roleTopicsArray = singleRole?.data?.response[0]?.roleTopics?.map(
      (item) => ({ _id: item._id, topicName: item.topic_name })
    );

    setSelectedRoleTopics({
      role: singleRole?.data?.response[0]?.role_name,
      topics: roleTopicsArray,
    });
  }, [singleRole]);

  return (
    <div className="flex flex-col h-[calc(100vh-40px)] md:h-[calc(100vh-100px)]">
      <div className="flex-1 overflow-y-auto place-content-center py-10">
        <p className="font-semibold text-base absolute top-0 bg-white w-full left-0 py-4 px-6 rounded-lg z-20">
          Select Your Target Role
        </p>

        <div className="md:w-3/4 mx-auto">
          <p className="font-semibold mb-3">Target Role (Choose one)</p>
          <div>
            {isLoading ? (
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <div
                    key={item}
                    className="h-2 w-full rounded-full bg-gray-100 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : (
              <Radio.Group
                value={selectedRole}
                onChange={(e) => roleOnChangeHandler(e.target.value)}
                className="grid grid-cols-2"
              >
                {rolesList?.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </Radio.Group>
            )}
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
              disabled={!selectedRole}
            >
              Next
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
