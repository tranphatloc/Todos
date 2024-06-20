import React from "react";

import { TodoType } from "./home-todo";
import { Todo } from "./todo";

type TodoProps = {
  todos: TodoType[];
  statusFilter: boolean;
  idLoading: number | null;
  onUpdateTodo: (id: number, status?: boolean, task?: string) => void;
  onDeleteTodo: (id: number) => void;
};

export const MapTodoList = ({
  todos,
  statusFilter,
  idLoading,
  onUpdateTodo,
  onDeleteTodo,
}: TodoProps) => {
  return (
    <div className="flex h-80 flex-col gap-2 overflow-y-auto rounded-lg bg-gray-300 p-4">
      {todos
        .filter((todo) => todo.status === statusFilter)
        .sort((a, b) => {
          return a.id - b.id;
        })
        .map((todo, index) => {
          return (
            <Todo
              disabled={todo.id === idLoading}
              key={index}
              id={todo.id}
              task={todo.task}
              status={todo.status}
              onStatusChange={(id, status) => onUpdateTodo(id, status)}
              onDelete={(id) => onDeleteTodo(id)}
              onTodoChange={(id, status, task) =>
                onUpdateTodo(id, status, task)
              }
            />
          );
        })}
    </div>
  );
};
