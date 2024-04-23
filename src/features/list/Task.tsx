import React, { FC, useState } from "react";
import { TaskActionButton } from "./TaskActionButton";
import { TaskEdit } from "./TaskEdit";
import { TaskCheckbox } from "./TaskCheckbox";

export type TaskType = {
  id: string;
  text: string;
  completed: boolean;
  createdDate?: number;
};

type Props = {
  task: TaskType;
  handleEdit: (taskId: string, taskText: string) => void;
  handleCheck: (taskId: string, checked: boolean) => void;
  handleClose: (taskId: string) => void;
};

const Task: FC<Props> = ({ task, handleEdit, handleCheck, handleClose }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const slideEffectClass = isEditMode ? "" : "group-hover:-translate-x-40";

  return (
    <li className="w-full h-auto h-900 relative flex  overflow-x-hidden first:rounded-t-xl last:rounded-b-xl group">
      {/* White background that slides on hover and show 'action buttons' */}
      <div
        className={`w-full h-full text-lg absolute bg-white group-hover:bg-gray-50 border-x border-b border-gray-200 transition duration-300 ${slideEffectClass}`}
      ></div>

      {/* Wrapper for task & checkbox */}
      <div
        title={task.text}
        className="w-[calc(100%-160px)] h-fill flex flex-row flex-nowrap items-start justify-start gap-6 p-5"
      >
        <TaskCheckbox task={task} handleCheckTask={handleCheck} />

        {/* Show either task's text or input to edit */}
        {!isEditMode ? (
          <div className="relative max-w-[calc(100%-80px)] mt-1 font-medium peer-checked:text-gray-300 peer-checked:line-through cursor-default">
            {task.text}
          </div>
        ) : (
          <TaskEdit
            task={task}
            handleEdit={handleEdit}
            setIsEditMode={setIsEditMode}
          />
        )}
      </div>

      {/* Action buttons */}
      {!isEditMode && (
        <div className="w-40 h-fill flex justify-end">
          <TaskActionButton type="edit" onClick={() => setIsEditMode(true)} />
          <TaskActionButton type="close" onClick={() => handleClose(task.id)} />
        </div>
      )}
    </li>
  );
};

export { Task };
