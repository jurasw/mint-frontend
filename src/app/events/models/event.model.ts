import { SafeStyle, SafeUrl } from '@angular/platform-browser';
import { IChatRoom } from 'src/app/chat/models/chat-room.interface';
import { IAttachment } from 'src/app/forum/models/posts.interface';
import { IUser } from 'src/app/_core/models/user.interface';
import { IOpenviduSession } from './openvidu-session.model';

export interface IEvent {
  id: number;
  title: string;
  description: string;
  targetGroupId: number;
  isPremium: boolean;
  isStarted: boolean;
  isPendingClose: boolean;
  recurrence: EventReccurence;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: IAttachment;
  thumbnailUrl?: SafeUrl | SafeStyle;
  creatorId: number;
  creator: IUser;
  organizerId: number;
  organizer: IUser;
  attendees: IUser[];
  suborganizers: IUser[];
  session?: IOpenviduSession;
  isSession?: boolean;
}

export type EventReccurence = 0 | 1 | 7 | 30;

export interface IEventRoom {
  id: number;
  event: IEvent;
  room: IChatRoom;
}
