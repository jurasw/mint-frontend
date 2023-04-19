import { IOption } from '../models/option.interface';

export const RECURRENCE_OPTIONS: IOption[] = [
  {
    displayName: 'Nie wybrano',
    value: 0,
  },
  {
    displayName: 'Codziennie',
    value: 1,
  },
  {
    displayName: 'Co tydzień',
    value: 7,
  },
  {
    displayName: 'Co miesiąc',
    value: 30,
  },
];
