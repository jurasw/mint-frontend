import { IPaginationData } from 'src/app/_core/models/pagination.model';
import { IPostResponse } from './posts.interface';
import { IThreadResponse } from './thread.interface';

export interface ISearchParams {
  subforumId?: number;
  threadId?: number;
  userId?: number;
  text?: string;
}

export interface ISearchResponse {
  threads: IThreadResponse & IPaginationData;
  posts: IPostResponse & IPaginationData;
}
export interface ISearchResult {
  type: 'thread' | 'post';
  forumId: number;
  threadId: number;
  postId?: number;
  page?: number;
}
