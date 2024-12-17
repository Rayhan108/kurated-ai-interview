import { Button, Input } from "antd";

export const StoryCraftingForm = ({ data }: { data: string }) => {
  return (
    <div>
      <div className="px-5">
        <p className="text-gray-700 pt-6 pb-3">
          Predictable Topic :{" "}
          <span className="text-red-500 font-bold">{data}</span>
        </p>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <p className="font-bold text-base">Response in HEARS Format</p>
              <Button type="text" className="px-1">
                Edit
              </Button>
            </div>
            <div
              className={`border rounded-md p-4 bg-gray-50 min-h-60 overflow-y-auto`}
            >
              <p className="text-sm">
                This is your answer structured in the HEARS format
              </p>
            </div>
          </div>

          <div>
            <p className="font-bold text-base">Add more context</p>

            <Input.TextArea
              rows={5}
              placeholder="If you need to add more context to the story above, feel free to do that here and regenerate your answer"
              onChange={() => {}}
            />
            <Button type="text" className="px-1 text-primaryColor my-1">
              Regenerate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
