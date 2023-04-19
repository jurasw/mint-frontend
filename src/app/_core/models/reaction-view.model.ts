import {
  ReactionId,
  ReactionType,
} from 'src/app/_core/models/reaction.interface';

export interface IReactionView {
  icon: string;
  reactionId: ReactionId;
  reactionType: ReactionType;
}
