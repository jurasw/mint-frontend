import { IUser } from '../../_core/models/user.interface';
import { IPost } from './posts.interface';

export interface IReportResponse {
  items: IReport[];
}

export interface IReport {
  subforumId: number;
  id: number;
  message: string;
  status: number;
  userId: number;
  user: IUser;
  postId: number;
  post: IPost;
}

export interface IReportInfo {
  message: string;
  messageWithCounter?: string;
  users: IUser[];
  post: IPost;
  status: number;
  reports: IReport[];
  author?: IUser;
}
