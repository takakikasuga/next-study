import { Price } from "@/app/components/Price";
import { Stars } from "@/app/components/Stars";
import { RestaurantCardType } from "@/types";
import { calcReviewRatingAverages } from "@/utils/calcReviewRatingAverages";
import Link from "next/link";
import React, { FC } from "react";

type PropsType = {
  restaurant: RestaurantCardType;
};

export const RestaurantCard: FC<PropsType> = ({ restaurant }) => {
  console.log("restaurant", restaurant);
  const renderRatingText = () => {
    const rating = calcReviewRatingAverages(restaurant.reviews);
    if (rating > 4) return "Awesome";
    if (rating <= 4 && rating > 3) return "Good";
    if (rating <= 3 && rating > 2) return "Average";
    return "";
  };
  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt="" className="w-44 h-36 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <Stars reviews={restaurant.reviews} />
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
};
