import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenViduSessionComponent } from './openvidu-session.component';
import { OpenviduSessionGuard } from './openvidu-session.guard';
const routes: Routes = [
  {
    path: '',
    canActivate: [OpenviduSessionGuard],
    component: OpenViduSessionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class OpenViduSessionRouting {}
