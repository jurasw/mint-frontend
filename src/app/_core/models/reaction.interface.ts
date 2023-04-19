import { IUser } from './user.interface';

export interface IReactionData {
  userId: number;
  resourceId: number;
  reaction: IReaction;
  user: IUser;
}

export interface IReaction {
  id: ReactionId;
  name: ReactionType;
  emoji: string;
}

export type ReactionType = 'Like' | 'Love' | 'Dislike';
export type ReactionId = 1 | 2 | 3;

export class ReactionNumbers {
  public Like = 0;
  public Love = 0;
  public Dislike = 0;
}

export type ReactionState = { id: ReactionId; state: boolean };
