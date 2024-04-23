import React, { FC, useState } from "react";
import { TaskType } from "./Task";
import { Button } from "./Button";

type Props = {
  task: TaskType;
  handleEdit: (taskId: string, taskText: string, isDone: boolean) => void;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskEdit: FC<Props> = ({ task, handleEdit, setIsEditMode }) => {
  const [taskText, setTaskText] = useState<string>(task.text);

  const handleEditTask = () => {
    setIsEditMode(false);
    handleEdit(task.id, taskText, task.completed);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setTaskText(task.text);
  };

  return (
    <div className="relative w-full">
      <input
        aria-label="Task description"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="block peer-checked:no-underline w-full p-1 bg-white hover:bg-yellow-50 peer-checked:bg-yellow-400 border-[3px] border-yellow-500 rounded-lg peer-checked:border-yellow-500 shadow-inner"
      />
      <div className="flex gap-4">
        <Button type="primary" label="OK" handleClick={handleEditTask} />
        <Button
          type="secondary"
          label="Cancel"
          handleClick={handleCancelEdit}
        />
      </div>
    </div>
  );
};

export { TaskEdit };
