import { Pipe, PipeTransform } from '@angular/core';
import * as mime from 'mime-types';
@Pipe({
  name: 'fileType',
})
export class FileTypePipe implements PipeTransform {
  public transform(type: string): any {
    return 'Plik.' + mime.extension(type);
  }
}
