import { IReactionView } from '../models/reaction-view.model';

export const REACTIONS: IReactionView[] = [
  {
    icon: 'fas fa-thumbs-up',
    reactionId: 3,
    reactionType: 'Like',
  },
  {
    icon: 'fas fa-heart',
    reactionId: 2,
    reactionType: 'Love',
  },
  {
    icon: 'fas fa-thumbs-down',
    reactionId: 1,
    reactionType: 'Dislike',
  },
];
