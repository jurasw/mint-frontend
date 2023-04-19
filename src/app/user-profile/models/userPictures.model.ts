import { IAttachment } from 'src/app/forum/models/posts.interface';

export interface IUserPictures {
  profilePicture: IAttachment | undefined;
  profilesPictures: IAttachment[];
}
