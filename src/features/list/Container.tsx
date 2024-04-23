import React, { FC } from "react";
import { List } from "./List";

const Container: FC = () => (
  <div className="mx-2 lg:mx-auto flex flex-col items-center ">
    {/* Headline */}
    <header className="w-min mx-auto py-20 text-4xl font-black">List</header>

    {/* List Box */}
    <section className="w-full max-w-screen-lg bg-gradient-to-br from-yellow-100 to-gray-400 p-2 lg:p-20 rounded-xl shadow-inner">
      <List />
    </section>
  </div>
);

export { Container };
