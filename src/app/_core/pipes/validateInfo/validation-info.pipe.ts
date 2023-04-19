import { Pipe, PipeTransform } from '@angular/core';
import {
  VALIDATORS,
  VALIDATOR_EXAMPLES
} from '../../constants/validations.constant';

@Pipe({
  name: 'validationInfo',
})
export class ValidationInfoPipe implements PipeTransform {
  public transform(regexData: any): string {
    let validationInfo = '';
    Object.entries(VALIDATORS).forEach(([key, value]) => {
      if (regexData.requiredPattern === value.toString()) {
        validationInfo = Object.entries(VALIDATOR_EXAMPLES)
          .filter(([exampleKey, exampleValue]) => exampleKey === key)
          .map(([exampleKey, exampleValue]) => exampleValue)[0];
      }
    });
    return 'Niepoprawny format. Przykład: ' + validationInfo;
  }
}
