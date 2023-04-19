import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  GENERAL_SURVEY_DESCRIPTIONS,
  PSYCHO_SURVEY_DESCRIPTIONS
} from 'src/app/_core/constants/surveys.constant';
import { ISurvey } from '../../models/survey.interface';
import { SurveyService } from '../../services/survey.service';

export interface ISurveyDescriptionData {
  title: string;
  description: string;
  footerInfo?: string;
  legend?: { [key: number]: string };
}

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit, OnDestroy {
  @Input() public isRetest = false;
  public surveys: ISurvey[] = [];
  public isLoading = false;
  public form: FormGroup = new FormGroup({});
  public surveyConfirmed = false;
  public surveyDescriptions: ISurveyDescriptionData[] = [];
  private _subscription = new Subscription();
  constructor(private _surveyService: SurveyService) {}

  get formControls(): { [key: string]: FormGroup } {
    return this.form.controls as { [key: string]: FormGroup };
  }

  get formControlLength(): number {
    return Object.values(this.form.controls).length;
  }

  public ngOnInit(): void {
    this.isLoading = true;
    this._getSurveyDescriptions();
    this._getSurveys();
  }

  public onSurveyConfirm(): void {
    this.surveyConfirmed = true;
  }

  private _getSurveys(): void {
    const surveys$: Observable<ISurvey[]> = this.isRetest
      ? this._surveyService.getSurveyPsychoQuestions()
      : this._surveyService.getSurveyQuestions();
    this._subscription = surveys$.subscribe(
      (data: ISurvey[]) => {
        this.surveys = data;
        this.isLoading = false;
        this._setForm();
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  private _getSurveyDescriptions(): void {
    this.surveyDescriptions = this.isRetest
      ? [...PSYCHO_SURVEY_DESCRIPTIONS]
      : [...GENERAL_SURVEY_DESCRIPTIONS, ...PSYCHO_SURVEY_DESCRIPTIONS];
  }

  private _setForm(): void {
    this.surveys.forEach((survey, index) => {
      const sectionForm = new FormGroup({});
      survey.questions.forEach((question) => {
        sectionForm.addControl(
          question.questionId.toString(),
          new FormControl('', { validators: [Validators.required] })
        );
      });
      this.form.addControl(index + survey.nameOfSurvey, sectionForm);
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
