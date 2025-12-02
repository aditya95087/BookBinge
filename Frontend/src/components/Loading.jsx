import React from "react";
import LoadingVideo from "../assets/Glowloading.mp4"; 
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
     
      <video
          src={LoadingVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-40 h-40 object-contain"
      />
    </div>
  );
};

export default LoadingPage;
