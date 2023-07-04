import React, { FC } from "react";
import Link from "next/link";
import { RestaurantCardType } from "@/types";
import { Price } from "@/app/components/Price";
import { calcReviewRatingAverages } from "@/utils/calcReviewRatingAverages";
import { Stars } from "./Stars";

type PropsType = {
  restaurant: RestaurantCardType;
};

export const RestaurantCard: FC<PropsType> = ({ restaurant }) => {
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link
        href={`/restaurant/${restaurant.slug}`}
        className="font-bold text-gray-700 text-2xl"
      >
        OpenTable
        <img src={restaurant.main_image} alt="" className="w-full h-36" />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <Stars reviews={restaurant.reviews} />
            <p className="ml-2">
              {restaurant.reviews.length} review
              {restaurant.reviews.length === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">{restaurant.location.name}</p>
        </div>
      </Link>
    </div>
  );
};
