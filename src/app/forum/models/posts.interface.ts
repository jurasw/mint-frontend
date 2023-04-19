import { IReactionData } from '../../_core/models/reaction.interface';
import { IUser } from '../../_core/models/user.interface';
import { IReport } from './report.interface';
import { IThread } from './thread.interface';

export interface IPostResponse {
  items: IPost[];
}

export interface IPost {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  forumThreadId: number;
  forumThread: IThread;
  authorId: number;
  author: IUser;
  postRef: number;
  attachments: IAttachment[];
  reactions: IReactionData[];
  reports?: IReport[];
}

export interface IPostData {
  body: string;
  attachments?: FileList;
}

export interface IAttachment {
  id: number;
  filePath: string;
  type: string;
  createdAt: string;
}

export interface IPostReportData {
  forumId: number;
  threadId: number;
  postId: number;
  message: string;
}
