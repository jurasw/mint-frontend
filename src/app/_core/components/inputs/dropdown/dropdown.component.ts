import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IOption } from '../../../models/option.interface';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent
  extends FormControlConnectorDirective
  implements OnInit
{
  @Input() public options: IOption[] = [];
  @Input() public hideBorder = false;
  @Input() public large = false;
  @Input() public addMargin = true;
  @Input() public placeholder = 'Wybierz jedną z opcji';
  constructor(public injector: Injector) {
    super(injector);
  }

  public ngOnInit(): void {
}
}
