"use client";
import { KeyConstant } from "@/constants/key.constant";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ProfileLayout({ children }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get(KeyConstant.TAB);

  return (
    <div>
      <h3 className="text-xl font-bold">My Profile</h3>

      <div className="flex items-center gap-4 md:gap-10 justify-center py-10">
        <Link
          href={"/profile"}
          className={`text-gray-600 font-semibold text-xs md:text-base ${
            !tab ? "text-red-500" : ""
          }`}
        >
          Personal Details
        </Link>

        <Link
          href={"/profile?tab=subscription"}
          className={`text-gray-600 font-semibold text-xs md:text-base ${
            tab === "subscription" ? "text-red-500" : ""
          }`}
        >
          Subscription
        </Link>

        <Link
          href={"/profile?tab=privacy"}
          className={`text-gray-600 font-semibold text-xs md:text-base ${
            tab === "privacy" ? "text-red-500" : ""
          }`}
        >
          Privacy Settings
        </Link>
      </div>
      {children}
    </div>
  );
}
