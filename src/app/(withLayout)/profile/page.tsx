"use client";

import { KeyConstant } from "@/constants/key.constant";
import { useSearchParams } from "next/navigation";
import { PersonalDetails } from "./components/personal-details";
import { Privacy } from "./components/privacy";
import { Subscription } from "./components/subscription";

export default function ProfilePage() {
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
