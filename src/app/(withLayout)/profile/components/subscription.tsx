"use client";
import { Button } from "antd";
import Link from "next/link";
export const Subscription = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-gray-100 p-5 space-y-1 rounded-md">
          <h3 className="font-bold text-lg">Subscription</h3>
          <p className="font-semibold">
            Your learning subscription is currently{" "}
            <span className="uppercase">ACTIVE</span>
          </p>
          <div className="flex items-center justify-between border-b-2 pb-1 font-semibold">
            <p>Renewal Date: April 20, 2024</p>
            <Link href={"/"} className="text-primaryColor underline">
              Change Payment Method
            </Link>
          </div>

          <div>
            <Button
              type="text"
              className="text-red-500 font-semibold text-center w-full"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>

        <div className="bg-gray-100 p-5 rounded-md">
          <h3 className="font-bold text-lg">Payment History</h3>
          <div className="place-content-center h-full pb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Date</p>
                <p className="font-semibold">04/24/2024</p>
              </div>
              <div>
                <p className="font-semibold">Amount</p>
                <p className="font-semibold">$ 14.99</p>
              </div>
              <div>
                <p className="font-semibold">Payment Status</p>
                <p className="font-semibold text-green-500">Successful</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
