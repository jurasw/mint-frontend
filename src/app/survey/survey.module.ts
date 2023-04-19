import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { CoreModule } from '../_core/_core.module';
import { SurveyRetestComponent } from './components/survey-retest/survey-retest.component';
import { SurveyQuestionComponent } from './components/survey/survey-question/survey-question.component';
import { SurveySectionComponent } from './components/survey/survey-section/survey-section.component';
import { SurveySummaryComponent } from './components/survey/survey-summary/survey-summary.component';
import { SurveyWelcomeComponent } from './components/survey/survey-welcome/survey-welcome.component';
import { SurveyComponent } from './components/survey/survey.component';
import { SurveyRetestGuard } from './services/survey-retest.guard';
import { SurveyGuard } from './services/survey.guard';
import { SurveyService } from './services/survey.service';
import { SurveyRoutingModule } from './survey.routing';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyQuestionComponent,
    SurveySectionComponent,
    SurveySummaryComponent,
    SurveyWelcomeComponent,
    SurveyRetestComponent
  ],
  providers: [
    SurveyService,
    SurveyRetestGuard,
    SurveyGuard
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    CoreModule,
    SurveyRoutingModule
  ],
})
export class SurveyModule {}
