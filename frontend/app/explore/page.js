import ExploreDirectory from "../../components/explore-directory";
import { getListings } from "../../lib/api";

export const dynamic = "force-dynamic";

export const metadata = { title: "Explore stays — WanderLust" };

export default async function ExplorePage({ searchParams }) {
  const sp = await searchParams;
  const initialQuery = sp?.q || "";
  const initialCategory = sp?.category || "All";
  const initialData = await getListings({
    page: 1,
    limit: 12,
    category: initialCategory,
    q: initialQuery,
  });

  return (
    <ExploreDirectory
      initialData={initialData}
      initialActive={initialCategory}
      initialQuery={initialQuery}
    />
  );
}
