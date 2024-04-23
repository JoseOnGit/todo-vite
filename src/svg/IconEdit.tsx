import React, { FC } from "react";

type Props = {
  colorClass?: string;
};

export const IconEdit: FC<Props> = ({ colorClass }) => {
  return (
    <svg
      className={`w-6 h-6 ${colorClass}`}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="512px"
      height="512px"
      viewBox="0 0 512 512"
      enableBackground="new 0 0 512 512"
      xmlSpace="preserve"
    >
      <g>
        <rect
          x="178.846"
          y="92.087"
          transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 224.3476 631.1498)"
          width="128.085"
          height="354.049"
        />
        <path
          d="M471.723,88.393l-48.115-48.114c-11.723-11.724-31.558-10.896-44.304,1.85l-45.202,45.203l90.569,90.568l45.202-45.202
		C482.616,119.952,483.445,100.116,471.723,88.393z"
        />
        <polygon points="64.021,363.252 32,480 148.737,447.979 	" />
      </g>
    </svg>
  );
};
