"use client";

import React, { useState } from "react";

import { error } from "console";

import { TodoType, getData } from "./home-todo";
import { MapTodoList } from "./map-todolist";
import { Todo } from "./todo";

export const TodoList = ({
  todos,
  onUpdateSuccess,
}: {
  todos: TodoType[];
  onUpdateSuccess: () => void;
}) => {
  const [idLoading, setIdLoading] = useState<number | null>(null);

  const onUpdateTodo = async (id: number,status?: boolean,task?: string) => {
    try {
      setIdLoading(id);
      const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, task }),
      });
      setIdLoading(null);
      if (!res.ok) {
        throw new Error("update failed");
      }
      onUpdateSuccess();
    } catch (err) {
      console.error("error", err);
    }
  };
  const onDeleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      onUpdateSuccess();
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 ">
      <MapTodoList
        todos={todos}
        statusFilter={false}
        idLoading={idLoading}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
      <MapTodoList
        todos={todos}
        statusFilter={true}
        idLoading={idLoading}
        onUpdateTodo={onUpdateTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </div>
  );
};
