import { Cuisine, Location, PRICE, Review } from "@prisma/client";

export type RestaurantCardType = {
  location: Location;
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  slug: string;
  price: PRICE;
  reviews: Review[];
};

export type RestaurantType = {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[];
};
