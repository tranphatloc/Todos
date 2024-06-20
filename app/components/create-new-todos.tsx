import React, { ChangeEvent } from "react";

type Props = {
  inputValue: string;

  handleSubmit: () => void;
  onNewToDoChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const CreateNewTodo = ({
  inputValue,
  handleSubmit,
  onNewToDoChange,
}: Props) => {
  return (
    <div className="flex items-center rounded-lg   bg-gray-50 p-4 ">
    <div className="flex items-center justify-between rounded-full border border-cyan-700 bg-gray-200 w-full">
      <input
        className="flex-1 rounded-full bg-transparent px-4 text-xs"
        placeholder="Enter your to-dos"
        value={inputValue}
        onChange={(e) => onNewToDoChange(e)}
      />
      <button
        className="flex text-nowrap rounded-full bg-cyan-600 p-2 text-xs text-white"
        onClick={()=>handleSubmit()}
      >
        Create Task
      </button>
    </div>
    </div>
  );
};
