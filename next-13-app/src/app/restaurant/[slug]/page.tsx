import { prisma } from "@/db";
import {
  RestaurantNavBar,
  Title,
  Rating,
  Description,
  Images,
  Reviews,
  ReservationCard,
} from "./components";
import { RestaurantType } from "@/types";

const fetchRestaurantBySlug = async (slug: string): Promise<RestaurantType> => {
  try {
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: {
        slug,
      },
      select: {
        id: true,
        name: true,
        images: true,
        description: true,
        slug: true,
      },
    });
    return restaurant;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  console.log(restaurant);
  return (
    <div>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard />
      </div>
    </div>
  );
}
