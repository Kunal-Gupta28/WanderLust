import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getListings, getListing, getCurrentUser } from "./api";

/**
 * TanStack Query hook for paginated & categorized listings with caching
 */
export function useListingsQuery(params = {}, initialData = undefined) {
  const { page = 1, limit = 12, category = "All", q = "" } = params;

  return useQuery({
    queryKey: ["listings", { page, limit, category, q }],
    queryFn: () => getListings({ page, limit, category, q }),
    placeholderData: keepPreviousData,
    initialData,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}

/**
 * TanStack Query hook for a single stay detail with caching
 */
export function useListingQuery(id, initialData = undefined) {
  return useQuery({
    queryKey: ["listing", id],
    queryFn: () => getListing(id),
    initialData,
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * TanStack Query hook for authenticated user state with caching
 */
export function useCurrentUserQuery() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    staleTime: 2 * 60 * 1000,
  });
}
