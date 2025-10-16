"use client";
import { useGetActiveSubscribeQuery, useGetPaymentHistoryQuery } from "@/redux/feature/tools/tools-api";
import { Button } from "antd";
import Link from "next/link";

export const Subscription = () => {
  const { data: activeSubscription } = useGetActiveSubscribeQuery(undefined);
  const isActive = activeSubscription?.data?.result;

  const { data: paymentHistory } = useGetPaymentHistoryQuery(undefined);
  const history = paymentHistory?.data?.result || [];

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5">
        {/* --- Subscription Info --- */}
        <div className="bg-gray-100 p-5 space-y-3 rounded-md">
          <h3 className="font-bold text-lg">Subscription</h3>
          <p className="font-semibold">
            Your learning subscription is currently{" "}
            <span className="uppercase text-green-600">
              {isActive?.length ? "ACTIVE" : "INACTIVE"}
            </span>
          </p>
          <div className="flex items-center justify-between border-b-2 pb-1 font-semibold">
            <p>Renewal Date: April 20, 2024</p>
            <Link href="/" className="text-primaryColor underline">
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

        {/* --- Payment History --- */}
        <div className="bg-gray-100 p-5 rounded-md">
          <h3 className="font-bold text-lg mb-3">Payment History</h3>

          {history.length === 0 ? (
            <p className="text-gray-500 text-sm">No payment history found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b border-gray-300">
                    <th className="py-2">Date</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item: any) => {
                    const date = new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    });
                    const amount = `$${item.amount}`;
                    const status =
                      item.statusAsText === "COMPLETED" || item.status === 1
                        ? "Successful"
                        : "Unsuccessful";

                    return (
                      <tr key={item._id} className="border-b border-gray-200">
                        <td className="py-2">{date}</td>
                        <td className="py-2">{amount}</td>
                        <td
                          className={`py-2 font-semibold ${
                            status === "Successful"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {status}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
