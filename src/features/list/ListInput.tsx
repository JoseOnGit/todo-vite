import React, { FC, useState } from "react";
import { Button } from "./Button";

type Props = {
  handleAddNew: (task: string) => void;
};

const ListInput: FC<Props> = ({ handleAddNew }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleClick = () => {
    if (taskText) {
      handleAddNew(taskText);
      setTaskText("");
    }
  };

  return (
    <div className="flex items-center gap-4">
      <input
        aria-label="Task description"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="block peer-checked:no-underline w-full p-3.5 mt-1.5 bg-white hover:bg-yellow-50 peer-checked:bg-yellow-400 border-[3px] border-yellow-500 rounded-lg peer-checked:border-yellow-500 shadow-inner"
      />
      <Button
        type="primary"
        label={"+"}
        handleClick={handleClick}
        customClasses={"text-3xl font-extrabold leading-normal"}
      />
    </div>
  );
};

export { ListInput };
