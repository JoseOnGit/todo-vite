import React, { FC } from "react";

const Spinner: FC = () => (
  <div
    style={{ borderTopColor: "transparent" }}
    className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"
  />
);

export { Spinner };
