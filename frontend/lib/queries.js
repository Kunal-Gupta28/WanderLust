import { useQuery, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { getListings, getListing, getCurrentUser } from "./api";

/**
 * TanStack Query hook for infinite scrolling listings with caching
 */
export function useInfiniteListingsQuery(params = {}, initialData = undefined) {
  const { limit = 12, category = "All", q = "" } = params;

  return useInfiniteQuery({
    queryKey: ["listings-infinite", { limit, category, q }],
    queryFn: ({ pageParam = 1 }) => getListings({ page: pageParam, limit, category, q }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.hasMore) {
        return (lastPage.pagination.page || 1) + 1;
      }
      return undefined;
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1],
        }
      : undefined,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
}

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
    staleTime: 5 * 60 * 1000,
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
