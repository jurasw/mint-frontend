export interface IPagination {
  page: number;
  limit: number;
}

export interface IPaginationData {
  currentPage: number;
  pageLimit: number;
  totalCount: number;
  totalPages: number;
}
