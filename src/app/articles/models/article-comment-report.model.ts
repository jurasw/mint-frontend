import { IUser } from 'src/app/_core/models/user.interface';
import { IArticleComment } from './article-comment.model';

export interface IArticleCommentReport {
  id: number;
  message: string;
  status: 0 | 1 | 2;
  createdAt: string;
  userId: number;
  user: IUser;
  postId: number;
  commentId: number;
  comment: IArticleComment;
}
