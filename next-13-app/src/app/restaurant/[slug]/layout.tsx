import { ResolvingMetadata, Metadata } from "next";
import { Header } from "./components";

type MetaPropsType = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: MetaPropsType,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const parent = await _parent;
  console.log("parent === ", parent);

  return {
    title: slug,
  };
}

export default function RestaurantLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <main>
      <Header name={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </main>
  );
}
