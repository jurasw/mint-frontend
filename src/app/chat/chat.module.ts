import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../_core/_core.module';
import { ChatRoutingModule } from './chat.routing';
import { ChatPanelItemComponent } from './components/chat-panel/chat-panel-item/chat-panel-item.component';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { ChatConversationComponent } from './components/chat-room/chat-conversation/chat-conversation.component';
import { ChatMessageOptionsComponent } from './components/chat-room/chat-message/chat-message-options/chat-message-options.component';
import { ChatMessageReactionsComponent } from './components/chat-room/chat-message/chat-message-reactions/chat-message-reactions.component';
import { ChatMessageComponent } from './components/chat-room/chat-message/chat-message.component';
import { ChatOptionsComponent } from './components/chat-room/chat-options/chat-options.component';
import { ChatResponseComponent } from './components/chat-room/chat-response/chat-response.component';
import { ChatRoomTitleComponent } from './components/chat-room/chat-room-title/chat-room-title.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatSearchResultsComponent } from './components/chat-search/chat-search-results/chat-search-results.component';
import { ChatSearchComponent } from './components/chat-search/chat-search.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { MessageService } from './services/message.service';
import { RoomService } from './services/room.service';

const COMPONENTS = [
  ChatViewComponent,
  ChatRoomComponent,
  ChatPanelComponent,
  ChatSearchComponent,
  ChatPanelItemComponent,
  ChatMessageComponent,
  ChatResponseComponent,
  ChatConversationComponent,
  ChatMessageReactionsComponent,
  ChatRoomTitleComponent,
  ChatSearchResultsComponent,
  ChatOptionsComponent,
  ChatMessageOptionsComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [MessageService, RoomService],
  imports: [
    CommonModule,
    ChatRoutingModule,
    CoreModule,
  ],
  exports: [...COMPONENTS],
})
export class ChatModule {}
