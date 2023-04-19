import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ISurveyQuestion } from 'src/app/survey/models/survey.interface';

@Component({
  selector: 'app-survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss'],
})
export class SurveyQuestionComponent implements OnInit {
  @Input() public question!: ISurveyQuestion;
  @Input() public questionControl!: FormControl;
  @Input() public questionCounter = false;
  @Input() public questionIndex!: number;
  @Input() public answerCounter = false;
  constructor() {}

  public ngOnInit(): void {}

  public setValue(answerId: number): void {
    this.questionControl.setValue(answerId);
  }
}
