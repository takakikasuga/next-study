import React, { FC } from "react";
import { PRICE } from "@prisma/client";

type PropsType = {
  price: PRICE;
};

export const Price: FC<PropsType> = ({ price }) => {
  const renderPrice = () => {
    if (price === PRICE.CHEAP) {
      return (
        <>
          <span>$$</span>
          <span className="text-gray-400">$$</span>
        </>
      );
    } else if (price === PRICE.REGULAR) {
      return (
        <>
          <span>$$$</span>
          <span className="text-gray-400">$</span>
        </>
      );
    }
    return <span>$$$$</span>;
  };
  return <p className="mr-3 flex">{renderPrice()}</p>;
};
