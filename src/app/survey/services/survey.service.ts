import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';
import { environment } from 'src/environments/environment';
import { IPsychologicalAnswers } from '../models/psychological-answer.interface';
import { ISurveyAnswers, ISurveySummaryData } from '../models/survey.interface';

const API_URL = environment.API_URL;

@Injectable()
export class SurveyService {
  constructor(
    private _http: HttpClient,
    private _authenticationService: AuthenticationService
  ) {}

  public confirmSurvey(
    answers: ISurveyAnswers
  ): Observable<ISurveySummaryData> {
    return this._http
      .post<ISurveySummaryData>(
        `${API_URL}/user/managed-account/confirmAnswer`,
        answers
      )
      .pipe(
        map((data: ISurveySummaryData) => {
          this._authenticationService.decodeToken(data.token.toString());
          return data;
        })
      );
  }

  public getSurveyQuestions(): Observable<any> {
    return this._http.get(`${API_URL}/survey/getsurveys`);
  }

  public getSurveyPsychoQuestions(): Observable<any> {
    return this._http.get(`${API_URL}/survey/getsurveyspsycho`);
  }

  public sendRetestAnswers(answers: IPsychologicalAnswers): Observable<any> {
    return this._http.post(`${API_URL}/survey/postpsychologicalanswer`, answers);
  }

  public isNecessaryRetest(): Observable<any> {
    return this._http.get(`${API_URL}/survey/isnecessaryretest`);
  }

  public getStatistics(): Observable<any> {
    return this._http.get(`${API_URL}/survey/statistics`);
  }
}
