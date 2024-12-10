import { AllImages } from "@/assets/AllImages";
import Image from "next/image";
import React from "react";

const LogoPart = () => {
  return (
    <div className="">
      <Image src={AllImages.logo} alt="logo" className=" lg:h-full h-7"></Image>
      <div>
        <h1 className="text-yellow-500 md:py-20 py-5 md:text-3xl text-xl md:text-start text-center">
          Empower your growth in the corporate world
        </h1>
      </div>
    </div>
  );
};

export default LogoPart;
