import { cn } from "@/lib/utils";

export default function MySectionTitle({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-lg md:text-xl font-semibold text-themePrimary",
        className
      )}
    >
      {title}
    </h2>
  );
}
