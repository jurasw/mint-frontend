import { IAttachment } from 'src/app/forum/models/posts.interface';
import { IReactionData } from 'src/app/_core/models/reaction.interface';
import { IUser } from 'src/app/_core/models/user.interface';

export interface IChatMessage {
  id: number;
  senderId: number;
  roomId: number;
  message: string;
  sent: string;
  sender: IUser;
  recipients: IChatRecipient[];
  attachments: IAttachment[];
  reactions: IReactionData[];
}

export interface IChatMessageResponse {
  items: IChatMessage[];
}

export interface IChatRecipient {
  id: number;
  userId: number;
  messageId: number;
  roomId: number;
  isRead: boolean;
  user: IUser;
}

export interface IChatNewMessage {
  message: string;
  attachments?: FileList;
}
