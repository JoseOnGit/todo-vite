import React, { FC, useEffect, useState } from "react";
import { Task, TaskType } from "./Task";
import { ListSort } from "./ListSort";
import { ListCheckAll } from "./ListCheckAll";
import { ListCloseAll } from "./ListCloseAll";
import { ListInput } from "./ListInput";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addNewTasksAsync,
  closeTasksAsync,
  completeTasksAsync,
  editTasksAsync,
  getAllTasksAsync,
  incompleteTasksAsync,
  listErrorSelector,
  listLoadingSelector,
  listSelector,
} from "../../app/listSlice";
import { Spinner } from "./Spinner";

const List: FC = () => {
  const dispatch = useAppDispatch();

  const listFromRedux = useAppSelector(listSelector);
  const listStatus = useAppSelector(listLoadingSelector);
  const listError = useAppSelector(listErrorSelector);

  const [listToShow, setListToShow] = useState<TaskType[]>(listFromRedux);
  console.log("%c⧭ listToShow ", "color: #9c66cc", listToShow);

  useEffect(() => {
    if (listStatus !== "loading") {
      dispatch(getAllTasksAsync());
    }
  }, []);

  useEffect(() => {
    if (listStatus !== "loading") {
      setListToShow(listFromRedux);
    }
  }, [listFromRedux, listStatus]);

  const handleAddNewTask = (task: string) => {
    dispatch(addNewTasksAsync({ text: task }));
  };

  const handleEditTask = (taskId: string, taskText: string) => {
    const modifiedTask = {
      id: taskId,
      text: taskText,
    };
    dispatch(editTasksAsync(modifiedTask));
  };

  const handleCheckTask = (taskId: string, checked: boolean) => {
    const task = listFromRedux.find((task) => task.id === taskId);

    if (checked && !task?.completed) {
      dispatch(completeTasksAsync(taskId));
    }

    if (!checked && task?.completed) {
      dispatch(incompleteTasksAsync(taskId));
    }
  };

  const handleCloseTask = (taskId: string) => {
    dispatch(closeTasksAsync(taskId));
  };

  return (
    <div className="flex flex-col">
      <div className="pb-2">
        <ListInput handleAddNew={handleAddNewTask} />
      </div>

      {/* display Loading spinner or Error message */}
      <div className="h-16 flex justify-center pb-2">
        {listStatus === "loading" && <Spinner />}
        {listError && <div className="text-red-500">{listError}</div>}
      </div>

      <div className="flex justify-between items-center px-5">
        <ListCheckAll
          tasksList={listFromRedux}
          handleCheckTask={handleCheckTask}
        />
        <ListSort tasksList={listFromRedux} setTasksList={setListToShow} />
        <ListCloseAll
          tasksList={listToShow}
          handleCloseTask={handleCloseTask}
          setListToShow={setListToShow}
        />
      </div>
      <ul>
        {listToShow.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleEdit={handleEditTask}
            handleCheck={handleCheckTask}
            handleClose={handleCloseTask}
          />
        ))}
      </ul>
    </div>
  );
};

export { List };
