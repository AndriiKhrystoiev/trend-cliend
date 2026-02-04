export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export type SortDirection = "asc" | "desc";

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export interface FilterConfig {
  field: string;
  value: string | number | boolean | string[];
  operator?: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
}

export interface TableState {
  page: number;
  pageSize: number;
  sort?: SortConfig;
  filters?: FilterConfig[];
}
