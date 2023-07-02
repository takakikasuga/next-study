import { Cuisine, Location, PRICE } from "@prisma/client";

export type RestaurantCardType = {
  location: Location;
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  slug: string;
  price: PRICE;
};

export type RestaurantType = {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
};
