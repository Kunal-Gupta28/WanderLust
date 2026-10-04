import { notFound } from "next/navigation";
import { getListing } from "../../../lib/api";
import ListingDetail from "../../../components/listing-detail";

export default async function ListingPage({ params }) {
  const { id } = await params;
  const { listing } = await getListing(id);
  
  if (!listing) notFound();

  return <ListingDetail listing={listing} />;
}
