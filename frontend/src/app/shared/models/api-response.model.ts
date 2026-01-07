export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: {
    rows: T[];
    meta: {
      limit: 10;
      page: 1;
      total: 1;
      totalPages: 1;
    };
  };
  message: string;
  success: boolean;
}
