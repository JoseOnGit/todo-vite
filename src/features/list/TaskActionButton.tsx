import React, { FC, ReactNode } from "react";
import { IconEdit } from "../../svg/IconEdit";
import { IconClose } from "../../svg/IconClose";

// Possible button variants
type ActionButtonVariant = "edit" | "close";

type ActionButtonType = {
  type: ActionButtonVariant;
  icon?: ReactNode;
  bground?: string;
};

type Props = {
  type: ActionButtonVariant;
  onClick: (event: unknown) => void;
};

// Button variants
const actionButtons: ActionButtonType[] = [
  {
    type: "edit",
    icon: (
      <IconEdit colorClass="fill-yellow-700 group-hover/button:scale-110" />
    ),
    bground: "bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-300",
  },
  {
    type: "close",
    icon: <IconClose colorClass="fill-red-700 group-hover/button:scale-110" />,
    bground: "bg-red-100 hover:bg-red-200 active:bg-red-300",
  },
];

const TaskActionButton: FC<Props> = ({ type, onClick }) => {
  const currentButton = actionButtons.find((button) => button.type === type);

  return (
    <button
      title={currentButton?.type}
      aria-label={currentButton?.type}
      onClick={onClick}
      className={`w-20 h-fill flex justify-center items-center cursor-pointer ${currentButton?.bground} group/button`}
    >
      {currentButton?.icon}
    </button>
  );
};

export { TaskActionButton };
