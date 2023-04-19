import {
  IPostPagination,
  IThreadPagination
} from 'src/app/forum/models/forum-pagination.interface';
import { IPagination } from '../models/pagination.model';
export const DEFAULT_LIMIT_PER_PAGE = 10;
export const DEFAULT_SEARCH_LIMIT_PER_PAGE = 20;

export const DEFAULT_PAGINATION: IPagination = {
  limit: DEFAULT_LIMIT_PER_PAGE,
  page: 1,
};

export const DEFAULT_THREAD_PAGINATION: IThreadPagination = {
  'ThreadPagination.Limit': DEFAULT_SEARCH_LIMIT_PER_PAGE,
  'ThreadPagination.Page': 1,
};

export const DEFAULT_POST_PAGINATION: IPostPagination = {
  'PostPagination.Limit': DEFAULT_SEARCH_LIMIT_PER_PAGE,
  'PostPagination.Page': 1,
};

export const DEFAULT_SEARCH_PAGINATION: IThreadPagination & IPostPagination = {
  ...DEFAULT_THREAD_PAGINATION,
  ...DEFAULT_POST_PAGINATION,
};

export const MAX_INT_VALUE = 2147483647;
