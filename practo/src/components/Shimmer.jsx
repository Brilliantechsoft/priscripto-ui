import React from "react";

const Shimmer = () => {
  return (
    <div className="p-4 space-y-4">
      {/* Title Placeholder */}
      <div className="h-6 bg-gray-300 rounded-lg w-1/3 animate-pulse"></div>
      
      {/* List Items Placeholder */}
      <div className="space-y-2">
        {Array(5)
          .fill("")
          .map((_, index) => (
            <div key={index} className="h-4 bg-gray-300 rounded-md w-full animate-pulse"></div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
