"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { TodoType } from "./home-todo";

type Edit = {
  id: number;
  task: string;
  status: boolean;
  onTodoChange: (id: number, status?: boolean, task?: string) => void;
};

export const EditPopup = ({ id, task, status, onTodoChange }: Edit) => {
  const [editTask, setEditTask] = useState(task);
  const [editStatus, setEditStatus] = useState(status);
  // console.log("id", id, editStatus, editTask);

  return (
    <div className="flex h-24 flex-col gap-4">
      <div className="flex items-center justify-center gap-5">
        <Input value={editTask} onChange={(e) => setEditTask(e.target.value)} />
        <Checkbox
          checked={editStatus}
          onClick={() => setEditStatus(!editStatus)}
        />
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-cyan-200 hover:bg-cyan-500"
          onClick={() => {
            onTodoChange(id, editStatus, editTask);
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
