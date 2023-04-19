import { SafeStyle, SafeUrl } from '@angular/platform-browser';
import { IUser } from '../../_core/models/user.interface';
import { IForum } from './forum.interface';
import { IAttachment, IPost } from './posts.interface';

export interface IThreadResponse {
  items: IThread[];
}

export interface IThread {
  id: number;
  title: string;
  description: string;
  postCount: number;
  createdAt: string;
  updatedAt: string;
  thumbnailId: number;
  thumbnail: IAttachment;
  thumbnailUrl?: SafeUrl | SafeStyle;
  authorId: number;
  author: IUser;
  subforumId: number;
  subforum: IForum;
  latestPost: IPost;
  isSubscribed: boolean;
  isRead: boolean;
}

export interface IThreadData {
  title: string;
  description: string;
  thumbnail?: string;
}
