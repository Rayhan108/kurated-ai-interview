"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function StroyBankLayout({ children }) {
  const pathname = usePathname();
  const params = pathname.split("/").pop();

  return (
    <div >
      <div className="border-b flex gap-8 items-center justify-center md:justify-normal mb-2">
        <Link
          href="/storybank/matrix"
          className={`${
            params === "matrix"
              ? "text-red-500 font-bold after:h-[1px] after:bg-red-500 after:block after:w-full"
              : "text-gray-600 font-semibold"
          }`}
        >
          Your Interview Matrix
        </Link>
        <Link
          href="/storybank/story-portfolio?story_type=EXTRACTED"
          // href="/storybank/story-portfolio"
          className={`${
            params === "story-portfolio"
              ? "text-red-500 font-bold after:h-[1px] after:bg-red-500 after:block after:w-full"
              : "text-gray-600 font-semibold"
          }`}
        >
          Your Story Portfolio
        </Link>
      </div>
      {children}
    </div>
  );
}

export default StroyBankLayout;
