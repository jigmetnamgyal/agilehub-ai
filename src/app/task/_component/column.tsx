import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TodoCard } from "./todoCard";

// const idToColumnText: {
// 	[key in TypedColumn]: string;
// } = {
// 	todo: "Todo",
// 	inprogress: "In Progress",
// 	done: "Done",
// };

export const Column = ({
  id,
  index,
  todos,
  status,
}: {
  id: string;
  index: number;
  todos: any;
  status: string;
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/30"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-bold">{status}</h2>

                  <span className="text-secondary text-sm">{todos.length}</span>
                </div>

                <div className="space-y-2">
                  {todos.map((todo: any, index: number) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          draggableHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  <div className="flex justify-center items-end p-2">
                    <button className="text-primary hover:text-primary">
                      <PlusCircleIcon className="h-10 w-10 " />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
