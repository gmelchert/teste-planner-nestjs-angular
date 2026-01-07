export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResult<T> {
  rows: T[];
  meta: PaginationInfo;
}

export function buildPaginationInfo(
  page: number,
  limit: number,
  total: number,
): PaginationInfo {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}
