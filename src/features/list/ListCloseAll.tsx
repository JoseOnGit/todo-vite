import React, { FC } from "react";
import { TaskType } from "./Task";
import { IconClose } from "../../svg/IconClose";

type Props = {
  tasksList: TaskType[];
  handleCloseTask: (taskId: string) => void;
  setListToShow: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const ListCloseAll: FC<Props> = ({
  tasksList,
  handleCloseTask,
  setListToShow,
}) => {
  const handleClose = () => {
    if (tasksList.length) {
      tasksList.map((task) => handleCloseTask(task.id));
      setListToShow([]);
    }
  };

  return (
    <div className="flex items-center gap-6 flex-row-reverse">
      <div
        onClick={handleClose}
        className="p-0.5 border-4 border-transparent hover:border-4 hover:border-yellow-500 rounded-lg hover:bg-yellow-400 duration-200 cursor-pointer peer group"
      >
        <IconClose colorClass="group-hover:fill-white" />
      </div>
      <span className="font-medium text-gray-400 peer-hover:text-black">
        Close All
      </span>
    </div>
  );
};

export { ListCloseAll };
