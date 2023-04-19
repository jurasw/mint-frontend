export interface INameDayData {
  month: number;
  day: number;
  namedays: INameDayNames;
}

export interface INameDay {
  status: boolean;
  data: INameDayData;
}

export interface INameDayNames{
  pl: string;
}
