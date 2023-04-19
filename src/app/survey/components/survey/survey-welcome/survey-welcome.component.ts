import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-welcome',
  templateUrl: './survey-welcome.component.html',
  styleUrls: ['./survey-welcome.component.scss'],
})
export class SurveyWelcomeComponent implements OnInit {
  @Input() public isRetest = false;
  constructor() {}

  public ngOnInit(): void {}
}
