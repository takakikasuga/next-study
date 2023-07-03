import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: Partial<{
    city: string;
    cuisine: string;
    price: PRICE;
  }>;
};

export const SearchSideBar: FC<PropsType> = ({
  locations,
  cuisines,
  searchParams,
}) => {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map(({ name, id }) => (
          <Link
            key={id}
            className="font-light text-reg"
            href={{
              pathname: "/search",
              query: {
                ...searchParams,
                city: name,
              },
            }}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map(({ name, id }) => (
          <Link
            key={id}
            className="font-light text-reg"
            href={{
              pathname: "/search",
              query: { ...searchParams, cuisine: name },
            }}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          <Link
            className="border w-full text-reg font-light rounded-l p-2"
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.CHEAP },
            }}
          >
            $
          </Link>
          <Link
            className="border-r border-t border-b w-full text-reg font-light p-2"
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.REGULAR },
            }}
          >
            $$
          </Link>
          <Link
            className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r"
            href={{
              pathname: "/search",
              query: { ...searchParams, price: PRICE.EXPENSIVE },
            }}
          >
            $$$
          </Link>
        </div>
      </div>
    </div>
  );
};
