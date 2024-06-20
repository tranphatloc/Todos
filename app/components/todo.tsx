import { useState } from "react";

import { Edit, Pencil, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { EditPopup } from "./edit-popup";

type TodoProps = {
  id: number;
  task: string;
  status: boolean;
  disabled: boolean;
  onStatusChange: (selectedId: number, newStatus: boolean) => void;
  onDelete: (id: number) => void;
  onTodoChange: (id: number, status?: boolean, task?: string) => void;
};
export const Todo = ({
  task,
  status,
  id,
  onStatusChange,
  disabled,
  onDelete,
  onTodoChange,
}: TodoProps) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };
  return (
    <div className="flex items-start justify-between">
      <div className="w-32 grow truncate text-wrap text-xs">{task}</div>
      <div className="flex items-center gap-1">
        <Dialog>
          <DialogTrigger>
            <Pencil strokeWidth={1} className="h-5 w-5" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>
            <EditPopup
              task={task}
              status={status}
              id={id}
              onTodoChange={(id, status, task) => {
                onTodoChange(id, status, task);
              }}
            />
          </DialogContent>
        </Dialog>

        <input
          className="h-5 w-5"
          disabled={disabled}
          type="checkbox"
          checked={status}
          onChange={() => {
            onStatusChange(id, !status);
          }}
        />
        <Trash2
          className="h-5 w-5"
          strokeWidth={1}
          onClick={handleDeleteClick}
        />
      </div>
    </div>
  );
};
