import { Progress } from "@/components/ui/progress";

export function MyProgressbar({ value }: { value: number }) {
  return (
    <div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
