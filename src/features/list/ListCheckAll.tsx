import React, { FC, useEffect, useState } from "react";
import { TaskType } from "./Task";

type Props = {
  tasksList: TaskType[];
  handleCheckTask: (taskId: string, checked: boolean) => void;
};

const ListCheckAll: FC<Props> = ({ tasksList, handleCheckTask }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isAutoTrigger, setIsAutoTrigger] = useState<boolean>(false);

  const hasToDo = tasksList.find((task) => !task.completed);

  // Check/uncheck whole list - trigger is checkbox
  useEffect(() => {
    if (isChecked && hasToDo && !isAutoTrigger) {
      setAllChecked(true);
    } else if (!isChecked && !hasToDo && !isAutoTrigger) {
      setAllChecked(false);
    }
    setIsAutoTrigger(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  // Check/uncheck checkbox - trigger is manualy checked list
  useEffect(() => {
    if (isChecked && hasToDo) {
      setIsChecked(false);
      setIsAutoTrigger(true);
    }
    if (!isChecked && !hasToDo) {
      setIsChecked(true);
      setIsAutoTrigger(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksList]);

  const setAllChecked = (checked: boolean) => {
    tasksList.map((task) => handleCheckTask(task.id, checked));
  };

  return (
    <div className="flex items-center gap-6">
      <input
        type="checkbox"
        id="all-done"
        value="true"
        className="hidden peer"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label
        htmlFor="all-done"
        className="relative w-[35px] h-[35px] p-3 bg-white hover:bg-yellow-50 peer-checked:bg-yellow-400 border-[3px] border-yellow-500 rounded-lg peer-checked:border-yellow-500 cursor-pointer shadow-inner after:[] after:absolute after:hidden after:bottom-2 after:left-2 after:w-3 about:blank#blocked after:h-5 after:border-white after:border-r-4 after:border-b-4 after:rotate-45 after:shadow-[3px_3px_3px_#eab308] peer-checked:after:block"
      />
      <span className="hidden md:block font-medium text-gray-400 peer-checked:text-black">
        All Done
      </span>
    </div>
  );
};

export { ListCheckAll };
