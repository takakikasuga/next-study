import React, { FC } from "react";

type PropsType = {
  description: string;
};

export const Description: FC<PropsType> = ({ description }) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  );
};
