import { IAttachment, IPost } from 'src/app/forum/models/posts.interface';

export interface IPosts {
  currentPage: string;
  items: IPost[];
  pageLimit: string;
  totalCount: string;
  totalPages: string;
}
