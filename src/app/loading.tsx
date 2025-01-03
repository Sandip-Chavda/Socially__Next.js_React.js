"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loading = () => {
  return (
    <div className="z-50 h-screen mx-auto w-full dark:bg-black/5 bg-white/5 ">
      <DotLottieReact
        src="https://lottie.host/10fc023d-32de-412a-8460-868e63e6d2fb/BWBsffettb.lottie"
        loop
        autoplay
        className="w-[250px] h-[250px] mx-auto"
      />
    </div>
  );
};

export default Loading;
