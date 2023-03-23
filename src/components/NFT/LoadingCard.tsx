import React from "react";

const LoadingCard = () => {
  return (
    <div className="group rounded-lg bg-gray-800 bg-opacity-80 p-1 shadow-lg hover:cursor-pointer hover:shadow-xl">
      <div className="flex h-48 w-full animate-pulse items-center justify-center overflow-hidden rounded-t-lg bg-gray-500"></div>
      <div className="py-2 px-1">
        <h1 className="h-7 w-1/2 animate-pulse rounded-full bg-gray-500"></h1>
        <h2 className="mt-3 h-6 w-2/3 animate-pulse rounded-full bg-gray-500"></h2>
        <h3 className="mt-3 h-6 w-1/4 animate-pulse rounded-full bg-gray-500"></h3>
      </div>
    </div>
  );
};

export default LoadingCard;
