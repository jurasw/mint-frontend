import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isQuotePost',
})
export class IsQuotePostPipe implements PipeTransform {
  public transform(input: any): any {
    if (input.includes('</q>')) {
      return input.split('</q>')[1];
    } else {
      return input;
    }
  }
}
