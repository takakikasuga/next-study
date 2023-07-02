import React, { FC } from "react";

type PropsType = {
  name: string;
};

export const Title: FC<PropsType> = ({ name }) => {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl">{name}</h1>
    </div>
  );
};
