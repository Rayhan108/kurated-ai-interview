import VerificationCode from "@/components/Auth/VerificationCode/VerificationCode";
import React, { Suspense } from "react";

const VerificationCodePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VerificationCode />
      </Suspense>
    </div>
  );
};

export default VerificationCodePage;


