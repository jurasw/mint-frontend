import { SafeStyle, SafeUrl } from '@angular/platform-browser';
import { IChatUserStatus } from 'src/app/chat/models/chat-user-status.interface';
import { IAttachment } from 'src/app/forum/models/posts.interface';

export interface IUser {
  id: number;
  nickName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirthday: string;
  city: string;
  roleId: number;
  isPremium: boolean;
  groups: string[];
  profilePicture: IAttachment;
  profilePictureUrl?: SafeUrl | SafeStyle;
  profilesPictures: IAttachment[];
  status: IChatUserStatus;
  about: string;
  forumRole: string;
}

export interface IUserPagination {
  items: IUser[];
}

export interface ICurrentUserData {
  name: string;
  id: number;
  role: string;
  premium: boolean;
  nickName: string;
  groups: IGroup[];
  token: string;
}

export interface IGroup {
  GroupId: number;
  Name: string;
  Type: string;
}
