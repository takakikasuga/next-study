import React, { FC } from "react";
import fullStar from "../../public/icons/full-star.png";
import error from "../../public/icons/error.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";
import Image from "next/image";
import { Review } from "@prisma/client";
import { calcReviewRatingAverages } from "@/utils/calcReviewRatingAverages";

type PropsType = {
  reviews: Review[];
  rating?: number;
};

export const Stars: FC<PropsType> = ({ reviews, rating }) => {
  const reviewRating = rating || calcReviewRatingAverages(reviews);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const diff = parseFloat((reviewRating - i).toFixed(1));
      if (diff >= 1) stars.push(fullStar);
      else if (diff < 1 && diff > 0) {
        if (diff <= 0.2) stars.push(emptyStar);
        else if (diff >= 0.2 && diff <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStar);
    }

    return stars.map((src) => (
      <Image src={src} alt="" className="h-4 w-4 mr-1" />
    ));
  };
  return renderStars();
};
