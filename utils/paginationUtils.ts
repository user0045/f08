
export const CONTENT_LIMITS = {
  HORIZONTAL_SECTION: 15,
  SEE_MORE_PAGE: 32,
} as const;

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const calculatePagination = (
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): PaginationInfo => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

export const getLatestContent = <T extends { created_at?: string; updated_at?: string }>(
  content: T[],
  limit?: number
): T[] => {
  const sorted = [...content].sort((a, b) => {
    const aDate = new Date(a.updated_at || a.created_at || 0);
    const bDate = new Date(b.updated_at || b.created_at || 0);
    return bDate.getTime() - aDate.getTime();
  });
  
  return limit ? sorted.slice(0, limit) : sorted;
};
