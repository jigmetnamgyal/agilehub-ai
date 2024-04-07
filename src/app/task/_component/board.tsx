"use client";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import { supabaseClient } from "@/app/api/supabase";
import { useAuth } from "@clerk/nextjs";
import { Column } from "./column";

export const Board = () => {
  const [items, setItems] = useState([
    {
      id: "1lfaslnfalskfn",
      status: "Todo",
      content: "Item 1",
      todos: [
        { id: "asfasfsaf4", title: "jtn" },
        { id: "5fasfsaf", title: "jtn" },
      ],
    },
    {
      id: "fasfasf2",
      content: "Item 2",
      status: "In Progress",
      todos: [{ id: "grhrwehrwhwr6", title: "in progress jtn" }],
    },
    {
      id: "rhgwqwcxvh3",
      content: "Item 3",
      status: "Done",
      todos: [{ id: "hershpqrr7", title: "jtn is done with task" }],
    },
  ]);

  const { getToken } = useAuth();
  const [boards, setBoards] = useState([]);
  const getBoards = async () => {
    const token = await getToken({ template: "jaggle_ai_supabase_jwt" });

    let { data, error } = await supabaseClient("").from("tasks").select("*");

    setBoards(data as any);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);

    // const columns = Array.from(items);
    // const startColIndex = columns[Number(result.source.droppableId)];
    // const finishColIndex = columns[Number(result.destination.droppableId)];

    // const startCol = {
    // 	id: startColIndex[0],
    // 	todos: startColIndex[1].todos,
    // };
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items.map((item: any, index: number) => (
              <Column
                key={item.id}
                id={item.id}
                index={index}
                todos={item.todos}
                status={item.status}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
