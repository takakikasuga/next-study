import {
  RestaurantNavBar,
  Menu,
} from "@/app/restaurant/[slug]/components/index";
import { prisma } from "@/db";
import { Item } from "@prisma/client";

const fetchRestaurantMenu = async (slug: string): Promise<Item[]> => {
  try {
    const restaurant = await prisma.restaurant.findUniqueOrThrow({
      where: {
        slug,
      },
      select: {
        items: true,
      },
    });
    return restaurant.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type PropsType = { params: { slug: string } };

export default async function RestaurantMenu({ params }: PropsType) {
  console.log("params === ", params);
  const menu = await fetchRestaurantMenu(params.slug);
  console.log("menu === ", menu);

  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar slug={params.slug} />
        <Menu menu={menu} />
      </div>
    </>
  );
}
