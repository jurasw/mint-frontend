import { SafeStyle, SafeUrl } from '@angular/platform-browser';
import { IAttachment } from 'src/app/forum/models/posts.interface';
import { IUser } from 'src/app/_core/models/user.interface';

export interface IArticle {
  id: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  user: IUser;
  thumbnail: IAttachment;
  thumbnailUrl?: SafeUrl | SafeStyle;
  imageDescription: string;
}

export interface IArticleResponse {
  items: IArticle[];
}
