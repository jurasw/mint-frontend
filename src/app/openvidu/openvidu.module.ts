import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatModule } from '../chat/chat.module';
import { EventService } from '../events/services/event.service';
import { OpenviduViewComponent } from './components/openvidu-view/openvidu-view.component';
import { OpenviduRoutingModule } from './openvidu.routing';
@NgModule({
  declarations: [
    OpenviduViewComponent
  ],
  imports: [
    CommonModule, OverlayModule, ChatModule, OpenviduRoutingModule
  ],
  providers: [EventService]
})
export class OpenviduModule {

}
