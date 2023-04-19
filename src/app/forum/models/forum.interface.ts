import { IUser } from '../../_core/models/user.interface';
import { IAttachment, IPost } from './posts.interface';
import { IThread } from './thread.interface';

export interface IForum {
  id: number;
  targetGroupId: number;
  title: string;
  description: string;
  threadCount: number;
  createdAt: string;
  updatedAt: string;
  thumbnailId: number;
  thumbnail: IAttachment;
  threads: IThread[];
  latestPost: IPost;
  attendees: IUser[];
  moderators: IUser[];
  isAttendee: boolean;
}
