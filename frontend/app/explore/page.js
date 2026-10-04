import ExploreDirectory from "../../components/explore-directory";
import { getListings } from "../../lib/api";

export const dynamic = "force-dynamic";

export const metadata = { title: "Explore stays — WanderLust" };

export default async function ExplorePage() {
  return <ExploreDirectory initialData={await getListings()} />;
}
