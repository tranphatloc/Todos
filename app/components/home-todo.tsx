"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { CreateNewTodo } from "./create-new-todos";
import { Todo as TodoType } from "./todo";
import { TodoList } from "./todo-list";

export const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todos");
    if (!res.ok) {
      throw new Error("not ok");
    }
    const data = (await res.json()) as TodoType[];
    // console.log(data);
    return data;
  } catch (error) {
    console.error("eroor: ", error);
  }
};

export type TodoType = { task: string; status: boolean; id: number };
export default function HomeTodo() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  const fecthTodos = async () => {
    const data = await getData();
    if (data) {
      setTodos(data);
    }
  };

  useEffect(() => {
    fecthTodos();
  }, []);
  const onNewToDoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() !== "") {
      try {
        const res = await fetch("http://localhost:3000/api/todos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: inputValue, status: false }),
        });
        setInputValue("");

        // CACH 1
        // const newTodoItem = (await res.json()) as {
        //   message: string;
        //   data: TodoType;
        // };
        // setTodos([...todos, newTodoItem.data]);

        // CACH 2
        fecthTodos();
      } catch (error) {
        console.error("error", error);
      }
    }
    // const newTodoItem: TodoType = {
    //   task: inputValue,
    //   status: false,
    // };
    // setTodos([...todos, newTodoItem]);
    // setInputValue("");
  };
  return (
    <div className="flex flex-col gap-4">
      <CreateNewTodo
        inputValue={inputValue}
        handleSubmit={handleSubmit}
        onNewToDoChange={onNewToDoChange}
      />
      <TodoList todos={todos} onUpdateSuccess={() => fecthTodos()} />
    </div>
  );
}
