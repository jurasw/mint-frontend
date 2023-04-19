import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})
export class TextareaComponent
  extends FormControlConnectorDirective
  implements OnInit
{
  @Input() public placeholder = 'Wpisz tekst...';
  @Input() public name = '';
  @Input() public wordsLimit = 0;
  @Input() public showErrors = true;
  @Input() public preventNewLineOnEnter = false;

  public descriptionLength = new Observable<number>();
  constructor(public injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {
    this.descriptionLength = this.control.valueChanges.pipe(
      map((value: string) =>
        value ? this.wordsLimit - value.length : this.wordsLimit
      )
    );
  }

  public onEnterKeyDown(event: Event): void {
    if (this.preventNewLineOnEnter) {
      event.preventDefault();
    }
  }
}
