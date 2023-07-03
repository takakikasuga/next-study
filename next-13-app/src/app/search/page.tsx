import { prisma } from "@/db";
import { Header, SearchSideBar, RestaurantCard } from "./components";
import { Metadata } from "next";
import { PRICE, Prisma } from "@prisma/client";

export const metadata: Metadata = {
  title: "Search",
};

type SearchParams = Partial<{
  city: string;
  cuisine: string;
  price: PRICE;
}>;

const fetchRestaurants = async ({ city, cuisine, price }: SearchParams) => {
  const where: Prisma.RestaurantWhereInput = {};
  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    location: true,
    slug: true,
    price: true,
    reviews: true,
  };

  if (city) {
    where.location = {
      name: city.toLowerCase(),
    };
  }
  if (cuisine) {
    where.cuisine = {
      name: cuisine.toLowerCase(),
    };
  }
  if (cuisine) {
    where.price = price;
  }

  const restaurants = await prisma.restaurant.findMany({
    where,
    select,
  });

  return restaurants;
};

const fetchLocations = () => prisma.location.findMany();
const fetchCuisines = () => prisma.cuisine.findMany();

type PropsType = {
  searchParams: SearchParams;
};

export default async function Search({ searchParams }: PropsType) {
  const [restaurants, locations, cuisines] = await Promise.all([
    fetchRestaurants(searchParams),
    fetchLocations(),
    fetchCuisines(),
  ]);
  console.log({ restaurants });

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area.</p>
          )}
        </div>
      </div>
    </>
  );
}
