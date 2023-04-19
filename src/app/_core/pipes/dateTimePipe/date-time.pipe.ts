import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { isToday, isYesterday } from 'date-fns';

@Pipe({
  name: 'dateTime',
})
export class DateTimePipe implements PipeTransform {
  public transform(htmlValue: string): string {
    if (!htmlValue || htmlValue === '') {
      return '';
    }
    const htmlDate: Date = new Date(htmlValue);

    if (isToday(htmlDate)) {
      return 'Dzisiaj o ' + formatDate(htmlDate, 'HH:mm', 'en');
    } else if (isYesterday(htmlDate)) {
      return 'Wczoraj o ' + formatDate(htmlDate, 'HH:mm', 'en');
    }
    return `dn. ${this.getFormattedDate(htmlValue)}`;
  }

  public getFormattedDate(date: string): string {
    if (!date) {
      return '';
    }

    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return '';
    } else {
      return formatDate(dateObj, 'dd.MM.YYYY HH:mm', 'en');
    }
  }
}
