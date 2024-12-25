import { LoaderCircle } from "lucide-react";

export const MyLoading = () => {
  return (
    <div className="flex items-center justify-center gap-2 h-screen">
      <LoaderCircle className="animate-spin" />
      Loading...
    </div>
  );
};
