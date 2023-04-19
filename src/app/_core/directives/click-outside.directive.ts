import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Input() public parentElement!: ElementRef;
  @Output() public clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  public onClick(target: Event): void {
    const elementClick = this.elementRef.nativeElement.contains(target);
    const parentElementClick = this.parentElement
      ? this.parentElement.nativeElement.contains(target)
      : false;
    if (!elementClick && !parentElementClick) {
      this.clickOutside.emit();
    }
  }
}
