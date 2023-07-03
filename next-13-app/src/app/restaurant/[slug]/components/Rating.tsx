import { Stars } from "@/components/Stars";
import { calcReviewRatingAverages } from "@/utils/calcReviewRatingAverages";
import { Review } from "@prisma/client";
import React, { FC } from "react";

type PropsType = {
  reviews: Review[];
};

export const Rating: FC<PropsType> = ({ reviews }) => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">
          {calcReviewRatingAverages(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Reviews</p>
      </div>
    </div>
  );
};
