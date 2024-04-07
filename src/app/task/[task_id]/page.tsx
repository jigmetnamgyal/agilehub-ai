import React from "react";
import { Board } from "../_component/board";
import { MeteorsComponent } from "../_component/meteorComponent";

function Task() {
  return (
    <div className="w-full h-[100svh] flex justify-center items-center flex-col">
      <MeteorsComponent />

      <div className="w-[95%] h-[85%] mt-4 bg-slate-900 z-50 p-12">
        <Board />
      </div>
    </div>
  );
}

export default Task;
