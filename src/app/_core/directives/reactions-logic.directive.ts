import { Directive } from '@angular/core';
import { REACTIONS } from '../constants/reactions.constant';
import { IReactionView } from '../models/reaction-view.model';
import { IReactionData, ReactionNumbers, ReactionState } from '../models/reaction.interface';
import { ReactionService } from '../services/reaction.service';

@Directive()
export class ReactionsLogicDirective {
  public reactionNumbers = new ReactionNumbers();
  public reactionState: ReactionState[] = [
    { id: 3, state: false },
    { id: 2, state: false },
    { id: 1, state: false },
  ];
  public reactions: IReactionView[] = REACTIONS;
  public previousActiveReactionId!: number;
  public currentReactionState!: ReactionState;
  public tempReactionState!: ReactionState[];
  constructor(protected reactionService: ReactionService) {}

  protected setReactions(reactions: IReactionData[]): void {
    this.reactionNumbers = this.reactionService.countReactions(
      reactions
    );
    this.reactionState = this.reactionService.setInitialActiveReaction(
      reactions,
      this.reactionState
    );
  }

  protected setCurrentReactionState(reaction: IReactionView): void {
    this.currentReactionState = {
      ...this.reactionState.filter((state) => state.state)[0],
    };
    if (
      this.currentReactionState.id &&
      this.currentReactionState.id !== reaction.reactionId
    ) {
      const reactionType = REACTIONS.filter(
        (r) => r.reactionId === this.currentReactionState.id
      )[0].reactionType;
      this.reactionNumbers[reactionType] -= 1;
    }
    this.reactionNumbers[reaction.reactionType] +=
      reaction.reactionId === this.currentReactionState.id &&
      this.currentReactionState.state
        ? -1
        : 1;
    this.tempReactionState = JSON.parse(JSON.stringify(this.reactionState));
    this.reactionState.forEach((state) => {
      state.state = false;
      if (
        state.id === reaction.reactionId &&
        this.currentReactionState.id !== reaction.reactionId
      ) {
        state.state = true;
      }
      return state;
    });
  }

  protected revertReactionState(reaction: IReactionView): void {
    this.reactionState = this.tempReactionState;
    this.reactionNumbers[reaction.reactionType] +=
      reaction.reactionId === this.currentReactionState.id &&
      this.currentReactionState.state
        ? 1
        : -1;
  }
}
