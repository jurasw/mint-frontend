import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyRetestComponent } from '../survey/components/survey-retest/survey-retest.component';
import { SurveyComponent } from './components/survey/survey.component';
import { SurveyRetestGuard } from './services/survey-retest.guard';
import { SurveyGuard } from './services/survey.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [SurveyGuard],
    component: SurveyComponent,
  },
  {
    path: 'survey-retest', component: SurveyRetestComponent, canActivate: [SurveyRetestGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule {}
