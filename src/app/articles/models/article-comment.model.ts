import { IReactionData } from 'src/app/_core/models/reaction.interface';
import { IUser } from 'src/app/_core/models/user.interface';

export interface IArticleComment {
  id: number;
  postId: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: IUser;
  reactions: IReactionData[];
  refNumber: number;
}

export interface IArticleCommentResponse {
  items: IArticleComment[];
}
