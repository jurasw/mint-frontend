import {
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
})
export class InputTextComponent extends FormControlConnectorDirective {
  @Input() public type = 'text';
  @Input() public name = '';
  @Input() public placeholder = '';
  @Input() public large = false;
  @Input() public icon!: string;
  @Input() public showErrors = true;
  @Input() public autocomplete = 'off';
  @Input() public hideBorder = false;
  @Input() public addMargin = true;
  @Input() public customValidationText = '';
  @Output() public iconClicked$: EventEmitter<void> = new EventEmitter();

  constructor(public injector: Injector) {
    super(injector);
  }

  public iconClick(): void {
    this.iconClicked$.emit();
  }
}
