"use client";
import { useMakePaymentForCourseMutation } from "@/redux/feature/tools/tools-api";
import { useRouter } from "next/navigation";
import React from "react";
import { message } from "antd"; 
export default function PricingModal({ closeLockedModal }) {
  const pricingPlans = [
    {
      planId: "64aaede67bfd9cf2d9db7d32",
      title: "1-Month",
      duration: "1 Month",
      screenPrice: 1999,
      stripePriceId: "price_1P3h6sAE6m5scJSkeFjKqnBa",
      currency: "usd",
      discount: 0,
      highlight: "Jumpstart your Success",
      color: "red",
      isPopular: false,
      originalPrice: null,
      saveText: null,
    },
    {
      planId: "64aaede67bfd9cf2d9db7d33",
      title: "3-Month",
      duration: "3 Months",
      screenPrice: 5399,
      stripePriceId: "price_1P3h6sAE6m5scJSkeFjKqnBc",
      currency: "usd",
      discount: 10,
      highlight: "Subscribers’ Favorite",
      color: "green",
      isPopular: true,
      originalPrice: 5997,
      saveText: "Save 10%",
    },
    {
      planId: "66915e15c8ea3a61a6d18a46",
      title: "6-Month",
      duration: "6 Months",
      screenPrice: 9999,
      stripePriceId: "price_1PaK20AE6m5scJSkUYyyu685",
      currency: "usd",
      discount: 17,
      highlight: "Perfect for your Long-Term Plans",
      color: "yellow",
      isPopular: false,
      originalPrice: 11994,
      saveText: "Save 17%",
    },
  ];
const [makePayment]=useMakePaymentForCourseMutation()
const router = useRouter();
  // Format price helper
  const formatPrice = (price, currency) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(price / 100);

  // ✅ Log only required fields
  const handlePlanClick = async(plan) => {
    const { planId,stripePriceId, currency } = plan;
    const data ={
      planId,
      screenPrice:96953,
      stripePriceId,
      currency,
    };
    console.log("payment data------->",data);
    try {
      const res = await makePayment(data).unwrap()
  
      console.log("payment response------->", res);
      // Example: redirect to Stripe or show success modal
      if (res?.success){
        message.success(res?.message)
        router.push(res?.data?.link);
      } 
    } catch (error) {
            console.log("payment responsed------->", error);
             message.success(error?.data?.message)
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto relative">
        {/* Close Button */}
        <button
          onClick={closeLockedModal}
          className="absolute top-6 right-6 text-gray-800 hover:text-gray-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid lg:grid-cols-[380px_1fr] gap-12 p-8 lg:p-12">
          {/* Left Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-600">Our Plan Highlights</h2>
            <ul className="space-y-4">
              {[
                "Proven Frameworks",
                "Access Expertly Crafted Videos",
                "Interactive Worksheets",
                "Customised Study Plans",
                "Progress Tracker",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section - Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {pricingPlans.map((plan) => (
              <div
                key={plan.planId}
                className={`relative border rounded-xl p-6 flex flex-col bg-white ${
                  plan.isPopular
                    ? `border-2 border-${plan.color}-600 shadow-md`
                    : "border-gray-300"
                }`}
              >
                {plan.isPopular && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 bg-${plan.color}-600 text-white px-5 py-1 rounded text-xs font-bold whitespace-nowrap`}
                  >
                    POPULAR CHOICE
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-800 text-center mb-2 mt-2">
                  {plan.title}
                </h3>

                <div className="text-center mb-2">
                  {plan.originalPrice && (
                    <div className="text-gray-400 line-through text-xs mb-1">
                      {formatPrice(plan.originalPrice, plan.currency)}
                    </div>
                  )}

                  <div className="flex items-start justify-center">
                    <span className={`text-${plan.color}-600 text-xl font-bold mr-0.5 mt-1`}>
                      $
                    </span>
                    <span className={`text-${plan.color}-600 text-5xl font-bold leading-none`}>
                      {(plan.screenPrice / 100).toFixed(2).split(".")[0]}
                    </span>
                    <span className={`text-${plan.color}-600 text-base font-bold mt-1`}>
                      .
                      {(plan.screenPrice / 100).toFixed(2).split(".")[1]}
                    </span>
                  </div>
                </div>

                {plan.saveText && (
                  <div className="flex justify-center mb-3">
                    <span
                      className={`bg-${plan.color}-100 text-${plan.color}-700 px-2.5 py-0.5 rounded text-xs font-semibold border border-${plan.color}-300`}
                    >
                      {plan.saveText}
                    </span>
                  </div>
                )}

                <p className="text-center text-gray-600 text-sm mb-6 flex-grow">
                  <span className={`text-${plan.color}-600 font-semibold`}>{plan.highlight}</span>
                </p>

                <button
                  className={`w-full py-2.5 px-4 rounded-md font-medium transition-colors text-sm ${
                    plan.isPopular
                      ? `bg-${plan.color}-600 text-white hover:bg-${plan.color}-700`
                      : `border border-${plan.color}-500 text-${plan.color}-600 hover:bg-${plan.color}-50`
                  }`}
                  onClick={() => handlePlanClick(plan)} // ✅ just this
                >
                  Begin your Journey
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
