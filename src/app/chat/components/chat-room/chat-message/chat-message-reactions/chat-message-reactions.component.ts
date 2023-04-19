import { Component, Input, OnInit } from '@angular/core';
import { IChatMessage } from 'src/app/chat/models/chat-message.interface';
import { MessageService } from 'src/app/chat/services/message.service';
import { REACTIONS } from 'src/app/_core/constants/reactions.constant';
import { IReactionView } from 'src/app/_core/models/reaction-view.model';
import { ReactionState } from 'src/app/_core/models/reaction.interface';
import { ReactionService } from 'src/app/_core/services/reaction.service';

@Component({
  selector: 'app-chat-message-reactions',
  templateUrl: './chat-message-reactions.component.html',
  styleUrls: ['./chat-message-reactions.component.scss'],
})
export class ChatMessageReactionsComponent implements OnInit {
  @Input() public message!: IChatMessage;
  @Input() public reactions = REACTIONS;
  @Input() public ownMessage!: boolean;
  public reactionState: ReactionState[] = [
    { id: 3, state: false },
    { id: 2, state: false },
    { id: 1, state: false },
  ];
  public isReactionActive = false;
  constructor(
    private _messageService: MessageService,
    private _reactionService: ReactionService
  ) {}

  public ngOnInit(): void {
    this._setReactions();
  }

  public reactionClick(reaction: IReactionView): void {
    if (!this.ownMessage) {
      const tempReactionState = JSON.parse(JSON.stringify(this.reactionState));
      this.reactionState.forEach(
        (s) => (s.state = s.id === reaction.reactionId && !s.state)
      );
      this.isReactionActive = this.checkActiveReaction();
      this._messageService
        .reactToMessage(
          this.message.roomId,
          this.message.id,
          this.isReactionActive ? reaction.reactionId : null
        )
        .subscribe(
          () => {},
          (err) => {
            this.reactionState = tempReactionState;
            this.isReactionActive = this.checkActiveReaction();
          }
        );
    }
  }

  private _setReactions(): void {
    this.reactionState = this._reactionService.setInitialActiveReaction(
      this.message.reactions,
      this.reactionState,
      false
    );
    this.isReactionActive = this.checkActiveReaction();
  }

  private checkActiveReaction(): boolean {
    return !!this.reactionState.filter((s) => s.state)[0];
  }
}
