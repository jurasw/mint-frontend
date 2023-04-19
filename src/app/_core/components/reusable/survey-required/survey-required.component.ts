import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-required',
  templateUrl: './survey-required.component.html',
  styleUrls: ['./survey-required.component.scss']
})
export class SurveyRequiredComponent implements OnInit {
  public surveyInfoText = `Aby móc skorzystać z forum wypełnij test psychologiczny,\n który pozwoli Ci lepiej poznać siebie.\n
  Całość badania zajmie około 20 minut.`;
  constructor(private _router: Router) { }

  public ngOnInit(): void {}

  public startSurvey(): void {
    this._router.navigate(['/survey']);
  }
}
