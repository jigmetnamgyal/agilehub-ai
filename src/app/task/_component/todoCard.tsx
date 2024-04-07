"use client";
import React from "react";

export const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  draggableHandleProps,
}: any) => {
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md text-black"
      ref={innerRef}
      {...draggableHandleProps}
      {...draggableProps}
    >
      {todo.title}
    </div>
  );
};
