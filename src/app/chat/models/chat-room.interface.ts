import { IUser } from 'src/app/_core/models/user.interface';
import { IChatMessage } from './chat-message.interface';

export interface IChatRoom {
  id: number;
  ownerId: number;
  name: string;
  owner: IUser;
  users: IUser[];
  unseenMessagesCount: 0;
  latestMessage: IChatMessage;
  isGroup: boolean;
}

export interface IChatRoomResponse {
  items: IChatRoom[];
}

export interface ICreateChatData {
  name: string;
  users: number[];
}
