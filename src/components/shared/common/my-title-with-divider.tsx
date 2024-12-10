export default function MyTitleWithDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <h3 className="text-xl font-medium uppercase">{title}</h3>
      <div className="h-[1px] bg-gray-300 w-full mt-[4px]"></div>
    </div>
  );
}
