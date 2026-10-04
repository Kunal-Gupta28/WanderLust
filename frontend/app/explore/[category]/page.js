import { notFound } from "next/navigation";
import ExploreDirectory from "../../../components/explore-directory";
import { categories, getListings } from "../../../lib/api";

const bySlug = Object.fromEntries(categories.map((category) => [category.toLowerCase().replaceAll(" ", "-"), category]));

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const selected = bySlug[category];
  if (!selected || selected === "All") notFound();
  return <ExploreDirectory initialData={await getListings()} initialActive={selected} />;
}
