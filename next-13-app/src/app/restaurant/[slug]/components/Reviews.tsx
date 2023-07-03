import React, { FC } from "react";
import { ReviewCard } from "./ReviewCard";
import { Review } from "@prisma/client";

type PropsType = {
  reviews: Review[];
};

export const Reviews: FC<PropsType> = ({ reviews }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} {reviews.length === 1 ? "person" : "people"} are
        saying
      </h1>
      <div>
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </div>
    </div>
  );
};
