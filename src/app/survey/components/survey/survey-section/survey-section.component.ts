import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ISurvey } from 'src/app/survey/models/survey.interface';
import { ISurveyDescriptionData } from '../survey.component';

@Component({
  selector: 'app-survey-section',
  templateUrl: './survey-section.component.html',
  styleUrls: ['./survey-section.component.scss'],
})
export class SurveySectionComponent implements OnInit {
  @Input() public descriptionData!: ISurveyDescriptionData;
  @Input() public survey!: ISurvey;
  @Input() public sectionFormGroup!: FormGroup;
  @Input() public isFirstSection = false;
  @Input() public isLastSection = false;
  @Input() public questions = false;
  @Output() public submitSurvey$: EventEmitter<void> = new EventEmitter();
  constructor() {}

  public ngOnInit(): void {}

  get sectionFormControls(): { [key: string]: FormControl } {
    return this.sectionFormGroup.controls as { [key: string]: FormControl };
  }

  public scrollUp(): void {
    window.scrollTo({ top: 0 });
  }

  public submit(): void {
    this.submitSurvey$.next();
  }
}
