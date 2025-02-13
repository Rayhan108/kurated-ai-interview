import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React from "react";

const PotentialPar = () => {
  return (
    <div className="text-white">
      <h1 className="text-2xl mb-4">Unlock Your Potential with Us:</h1>
      <div className="flex flex-col gap-4">
        <div className="text-base flex lg:items-center items-start gap-4">
          <Image
            src={AllImages.pathIcon}
            alt="pathIcon"
            className="h-10 w-10"
          />{" "}
          <p>
            MBB-level methodology: Proven frameworks for strategic excellence.
          </p>
        </div>
        <div className="text-base flex items-center gap-4">
          <Image src={AllImages.videoIcon} alt="icon" className="h-10 w-10" />{" "}
          <p>Video Modules: Engaging lessons anytime, anywhere.</p>
        </div>
        <div className="text-base flex items-center gap-4">
          <Image src={AllImages.classIcon} alt="icon" className="h-10 w-10" />{" "}
          <p>Asynchronous training: Learn at your own pace.</p>
        </div>
        <div className="text-base flex items-center gap-4">
          <Image src={AllImages.optionIcon} alt="icon" className="h-10 w-10" />{" "}
          <p>Real-world application: Practical skills for immediate impact.</p>
        </div>
        <div className="text-base flex items-center gap-4">
          <Image src={AllImages.aiIcon} alt="icon" className="h-10 w-10" />{" "}
          <p>New AI Features Coming Soon!</p>
        </div>
      </div>
    </div>
  );
};

export default PotentialPar;
