import React from "react";
import { Meteors } from "./meteor";

export function MeteorsComponent() {
  return (
    <div className="flex justify-center items-center w-[95%]">
      <div className="relative h-[50px]">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.60] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 h-full overflow-hidden rounded-2xl flex justify-center items-center">
          <p className="font-normal text-md text-white relative z-50">
            Jaggle is summarizing the task for the day.
          </p>
          <Meteors number={20} />
        </div>
      </div>
    </div>
  );
}
