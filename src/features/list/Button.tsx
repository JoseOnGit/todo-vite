import React, { FC } from "react";

// Possible button variants
type ButtonType = "primary" | "secondary";

type Props = {
  label: string;
  handleClick: () => void;
  type: ButtonType;
  active?: boolean;
  customClasses?: string;
};

const Button: FC<Props> = ({
  type,
  label,
  handleClick,
  active,
  customClasses,
}) => {
  const buttonTypesClasses = active
    ? "text-white bg-black"
    : type === "primary"
    ? "text-black bg-yellow-400"
    : "text-black";

  return (
    <button
      onClick={handleClick}
      className={`w-24 p-1\\.5 mt-2 p-1.5 font-medium ${buttonTypesClasses} hover:text-white hover:bg-black rounded-lg flex justify-center duration-200 cursor-pointer ${customClasses}`}
    >
      {label}
    </button>
  );
};

export { Button };
