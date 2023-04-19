import { Injectable } from '@angular/core';
import {
  IReactionData,
  ReactionNumbers,
  ReactionState
} from '../models/reaction.interface';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ReactionService {
  constructor(private _authService: AuthenticationService) {}

  public countReactions(data: IReactionData[]): ReactionNumbers {
    const reactionNumbers = new ReactionNumbers();
    if (data.length > 0) {
      data.forEach((dataReaction) => {
        if (dataReaction.reaction) {
          reactionNumbers[dataReaction.reaction.name]++;
        }
      });
    }
    return reactionNumbers;
  }

  public setInitialActiveReaction(
    data: IReactionData[],
    reactionState: ReactionState[],
    filterOwnReactions = true
  ): ReactionState[] {
    if (data.length > 0) {
      const reaction = filterOwnReactions
        ? data.filter(
            (dataReaction) =>
              this._authService.currentUser && +dataReaction.userId === +this._authService.currentUser.id
          )[0]
        : data[0];
      if (reaction && reaction.reaction) {
        reactionState.forEach((state) => {
          if (state.id === reaction.reaction.id) {
            state.state = true;
          }
        });
      }
    } else {
      reactionState.forEach((state) => {
        state.state = false;
      });
    }
    return reactionState;
  }
}
