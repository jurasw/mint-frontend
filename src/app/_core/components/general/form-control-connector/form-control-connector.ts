import { Directive, Injector, Input, ViewChild } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormControlDirective
} from '@angular/forms';

@Directive()
export class FormControlConnectorDirective implements ControlValueAccessor {
  @ViewChild(FormControlDirective, { static: true })
  public formControlDirective!: FormControlDirective;

  @Input()
  public formControl!: FormControl;

  @Input()
  public formControlName!: string;

  get control(): any {
    if (this.formControl) {
      return this.formControl;
    } else if (this.controlContainer.control) {
      return this.controlContainer.control.get(this.formControlName) as FormControl;
    }
    return;
  }

  constructor(public injector: Injector) {}

  get controlContainer(): ControlContainer {
    return this.injector.get(ControlContainer);
  }

  public registerOnTouched(fn: any): void {
    if (this.formControlDirective && this.formControlDirective.valueAccessor) {
      this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }
  }

  public registerOnChange(fn: any): void {
    if (this.formControlDirective && this.formControlDirective.valueAccessor) {
      this.formControlDirective.valueAccessor.registerOnChange(fn);
    }
  }

  public writeValue(obj: any): void {
    if (this.formControlDirective && this.formControlDirective.valueAccessor) {
      this.formControlDirective.valueAccessor.writeValue(obj);
    }
  }

  public setDisabledState(isDisabled: boolean): void {
    if (
      this.formControlDirective &&
      this.formControlDirective.valueAccessor &&
      this.formControlDirective.valueAccessor.setDisabledState
    ) {
      this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    }
  }
}
