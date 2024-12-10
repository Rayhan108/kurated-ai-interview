import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export const MyLinkButton = ({
  children,
  href,
  target,
  className,
}: {
  children: ReactNode;
  href: string;
  target?: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        "block w-fit bg-primaryColor py-2 px-4 text-white rounded-md font-medium hover:bg-primaryColor/80",
        className
      )}
      target={target}
    >
      {children}
    </Link>
  );
};
