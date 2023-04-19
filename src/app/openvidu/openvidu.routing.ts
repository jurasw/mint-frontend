import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenviduViewComponent } from './components/openvidu-view/openvidu-view.component';
const routes: Routes = [
  {
    path: ':id',
    component: OpenviduViewComponent,
    children: [
      {
        path: '', loadChildren: () => import('./components/openvidu-session/openvidu-session.module').then((m) => m.OpenViduSessionModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class OpenviduRoutingModule {}
