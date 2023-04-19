import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatModule } from '../chat/chat.module';
import { CoreModule } from '../_core/_core.module';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { ChatBubblesViewComponent } from './components/chat-bubbles-view/chat-bubbles-view.component';

const COMPONENTS = [ChatBubbleComponent, ChatBubblesViewComponent];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [],
  imports: [CommonModule, ChatModule, CoreModule],
  exports: [...COMPONENTS],
})
export class ChatBubblesModule {}
