"use client";

import { MyLoading } from "@/components/shared/common/my-loading";
import { useLoggedInUserQuery } from "@/redux/feature/auth/authApi";
import { useRouter } from "next/navigation";

export const AuthGuard = ({ children }) => {
  const { data, isLoading } = useLoggedInUserQuery();
  const router = useRouter();

  if (isLoading) {
    return <MyLoading />;
  }
  if (data?.code !== 200) {
    router.push("/log-in");
  }
  return <div>{children}</div>;
};
