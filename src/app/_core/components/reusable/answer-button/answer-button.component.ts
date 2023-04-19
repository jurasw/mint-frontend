import {
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlConnectorDirective } from '../../general/form-control-connector/form-control-connector';

@Component({
  selector: 'app-answer-button',
  templateUrl: './answer-button.component.html',
  styleUrls: ['./answer-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnswerButtonComponent),
      multi: true,
    },
  ],
})
export class AnswerButtonComponent
  extends FormControlConnectorDirective
  implements OnInit
{
  @Input() public value: any;
  @Input() public name!: string;
  @Input() public id = '';
  @Input() public message = '';
  @Input() public messageCounter = false;
  @Input() public messageIndex!: number;
  @ViewChild('radio') public radioInput!: ElementRef;
  constructor(private _injector: Injector) {
    super(_injector);
  }

  public ngOnInit(): void {}
}
