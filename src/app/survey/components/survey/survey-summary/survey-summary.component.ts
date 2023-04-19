import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPsychologicalAnswers } from 'src/app/survey/models/psychological-answer.interface';
import {
  ISurveyAnswers,
  ISurveySummaryData,
  ISurveySummmaryDescription
} from 'src/app/survey/models/survey.interface';
import { SurveyService } from 'src/app/survey/services/survey.service';
import { SessionStorageService } from 'src/app/_core/services/sessionstorage.service';

@Component({
  selector: 'app-survey-summary',
  templateUrl: './survey-summary.component.html',
  styleUrls: ['./survey-summary.component.scss'],
})
export class SurveySummaryComponent implements OnInit, OnDestroy {
  @Input() public form!: FormGroup;
  @Input() public isRetest = false;
  @Input() public registrationSummaryData!: ISurveySummaryData;
  public isLoading = false;
  private _subscription: Subscription = new Subscription();
  constructor(private _router: Router,
              private _surveyService: SurveyService,
              private _route: ActivatedRoute,
              private _sessionStorageService: SessionStorageService) {}

  public ngOnInit(): void {
    if (this.isRetest) {
      this._getRetestSummary();
    } else {
      this._getSurveySummary();
    }
  }

  public finishSurvey(): void {
    const url = this._route.snapshot.queryParams.returnUrl || (this.isRetest ? '/home' : '/forums');
    this._router.navigateByUrl(url);
  }

  private _getSurveySummary(): void {
    const values: any[] = [];
    for (const section of Object.values(this.form.controls)) {
      values.push(Object.values(section.value));
    }
    if (this.form.valid) {
      const data: ISurveyAnswers = {
        statisticalAnswers: values[0],
        generalAnswers: values[1],
        psychologicalAnswer: {
          answersSES: values[2],
          answersSWLS: values[3],
        },
      };
      this.isLoading = true;
      this._surveyService.confirmSurvey(data).subscribe(
        (summaryData: ISurveySummaryData) => {
          this.isLoading = false;
          this.registrationSummaryData = summaryData;
        },
        (err) => (this.isLoading = false)
      );
    }
  }

  private _getRetestSummary(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const values: any[] = [];
      for (const section of Object.values(this.form.controls)) {
        values.push(Object.values(section.value));
      }
      const data: IPsychologicalAnswers = {
        answersSES: values[0],
        answersSWLS: values[1],
      };
      this._subscription = this._surveyService
        .sendRetestAnswers(data)
        .subscribe(
          (descriptions: ISurveySummmaryDescription[]) => {
            this._sessionStorageService.setItem('isNecessaryRetest', false);
            this.isLoading = false;
            this.registrationSummaryData = {
              descriptionGroups: [],
              descriptionPsychological: [],
              token: ''
            };
            this.registrationSummaryData.descriptionPsychological =
              descriptions;
          },
          (err) => (this.isLoading = false)
        );
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
