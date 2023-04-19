import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
})
export class RadioComponent
  extends FormControlConnectorDirective
  implements OnInit
{
  @Input() public value: any;
  @Input() public name!: string;
  @Input() public id = '';
  @Input() public message = '';
  @Input() public disabled: boolean | null = null;
  constructor(private _injector: Injector) {
    super(_injector);
  }

  public ngOnInit(): void {}
}
