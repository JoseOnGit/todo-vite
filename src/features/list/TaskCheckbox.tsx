import React, { FC, useEffect, useState } from "react";
import { TaskType } from "./Task";

type Props = {
  task: TaskType;
  handleCheckTask: (taskId: string, checked: boolean) => void;
};

const TaskCheckbox: FC<Props> = ({ task, handleCheckTask }) => {
  const [checked, setChecked] = useState<boolean>(task.completed);

  useEffect(() => {
    setChecked(task.completed);
  }, [task.completed]);

  const handleCheckbox = () => {
    handleCheckTask(task.id, !checked);
    setChecked(!checked);
  };

  return (
    <>
      <input
        type="checkbox"
        id={`task-done-${task.id}`}
        value="true"
        className="hidden peer"
        checked={checked}
        onChange={handleCheckbox}
      />
      <label
        htmlFor={`task-done-${task.id}`}
        className="relative w-[35px] h-[35px] p-3 bg-white hover:bg-yellow-50 peer-checked:bg-yellow-400 border-[3px] border-yellow-500 rounded-lg peer-checked:border-yellow-500 cursor-pointer shadow-inner after:[] after:absolute after:hidden after:bottom-2 after:left-2 after:w-3 about:blank#blocked after:h-5 after:border-white after:border-r-4 after:border-b-4 after:rotate-45 after:shadow-[3px_3px_3px_#eab308] peer-checked:after:block"
      />
    </>
  );
};

export { TaskCheckbox };
