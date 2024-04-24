import React, { FC, useEffect, useState } from "react";
import { TaskType } from "./Task";
import { Button } from "./Button";

type Props = {
  tasksList: TaskType[];
  setTasksList: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

const ListSort: FC<Props> = ({ tasksList, setTasksList }) => {
  const [showDone, setShowDone] = useState<boolean>(false);
  const [showToDo, setShowToDo] = useState<boolean>(false);

  const doneTasks = tasksList.filter((task) => task.completed);
  const toDoTasks = tasksList.filter((task) => !task.completed);

  useEffect(() => {
    if (showDone) {
      setTasksList(doneTasks);
    }
    if (showToDo) {
      setTasksList(toDoTasks);
    }
    if (!showDone && !showToDo) {
      setTasksList(tasksList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksList, showDone, showToDo]);

  return (
    <div className="flex flex-col md:flex-row mb-2 gap-2">
      <Button
        type="primary"
        label={`All (${tasksList.length})`}
        active={!showDone && !showToDo}
        handleClick={() => {
          setShowDone(false);
          setShowToDo(false);
        }}
      />
      <Button
        type="primary"
        label={`ToDo (${toDoTasks.length})`}
        active={showToDo}
        handleClick={() => {
          setShowDone(false);
          setShowToDo(true);
        }}
      />
      <Button
        type="primary"
        label={`Done (${doneTasks.length})`}
        active={showDone}
        handleClick={() => {
          setShowDone(true);
          setShowToDo(false);
        }}
      />
    </div>
  );
};

export { ListSort };
