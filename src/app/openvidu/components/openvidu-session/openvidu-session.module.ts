import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpenviduSessionModule } from 'openvidu-angular';
import { CoreModule } from 'src/app/_core/_core.module';
import { ChatModule } from '../../../chat/chat.module';
import { OpenViduSessionComponent } from './openvidu-session.component';
import { OpenviduSessionGuard } from './openvidu-session.guard';
import { OpenViduSessionRouting } from './openvidu-session.routing';
@NgModule({
  declarations: [
    OpenViduSessionComponent,
  ],
  imports: [
    CommonModule, OpenviduSessionModule,  OpenViduSessionRouting, OverlayModule, ChatModule, CoreModule
  ],
  providers: [OpenviduSessionGuard]
})
export class OpenViduSessionModule {

}
