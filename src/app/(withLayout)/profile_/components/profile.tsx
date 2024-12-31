"use client";

import { KeyConstant } from "@/constants/key.constant";
import { useSearchParams } from "next/navigation";
import { PersonalDetails } from "./personal-details";
import { Privacy } from "./privacy";
import { Subscription } from "./subscription";

export default function Profile() {
  const searchParams = useSearchParams();

  const tab = searchParams.get(KeyConstant.TAB);
  return (
    <div>
      {!tab && <PersonalDetails />}
      {tab === "subscription" && <Subscription />}
      {tab === "privacy" && <Privacy />}
    </div>
  );
}
