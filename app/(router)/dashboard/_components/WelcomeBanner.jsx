import React from "react";
import Image from "next/image";

function WelcomeBanner() {
  return (
    <div className="flex gap-5 items-center p-5 bg-white rounded-xl">
      <Image
        src="/panda.png"
        alt="bannerimage"
        width={100}
        height={100}
        className="rounded-lg trasparent"
      />
      <div>
        <h2 className="font-bold text-[27px]">
          Welcome Back{" "}
          <span className="text-primary">Internship Search Guru...</span>
        </h2>
        <h2 className="text-gray-500">
          Explore..Learn and Build All Real Life Projects
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBanner;
