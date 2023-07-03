import { Review } from "@prisma/client";
export const calcReviewRatingAverages = (review: Review[]) =>
  review.length
    ? review.reduce((sum, review) => sum + review.rating, 0) / review.length
    : 0;
