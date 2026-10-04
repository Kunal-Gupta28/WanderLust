import ExploreClient from "../components/explore-client";
import { getListings } from "../lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  return <ExploreClient initialData={await getListings()} />;
}
