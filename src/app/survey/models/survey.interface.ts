import { IPsychologicalAnswers } from './psychological-answer.interface';

export interface ISurvey {
  nameOfSurvey: string;
  questions: ISurveyQuestion[];
}

export interface ISurveyQuestion {
  question: string;
  questionId: number;
  answers: ISurveyAnswer[];
}

export interface ISurveyAnswer {
  answer: string;
  answerId: number;
}

export interface ISurveySummaryData {
  token: string;
  descriptionPsychological: ISurveySummmaryDescription[];
  descriptionGroups: string[];
}

export interface ISurveySummmaryDescription {
  name: string;
  description: string;
}

export interface ISurveyAnswers {
  statisticalAnswers: number[];
  generalAnswers: number[];
  psychologicalAnswer: IPsychologicalAnswers;
}
