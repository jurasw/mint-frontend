import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { LoaderComponent } from '../components/utilities/loader/loader.component';

@Directive({
  selector: '[appLoader]',
})
export class LoaderDirective implements OnInit, OnChanges {
  @Input('appLoader') public load = false;
  @Input() public className!: string;
  @Input() public minHeight = 200;
  @Input() public background = false;
  @Input() public backgroundColor!: string;
  @Input() public opacity = 1;

  constructor(
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _renderer: Renderer2
  ) {}

  public ngOnInit(): void {}

  public ngOnChanges(): void {
    const host = this.className
      ? this._elementRef.nativeElement.querySelector(this.className)
      : this._elementRef.nativeElement;
    this._renderer.setStyle(host, 'position', 'relative');
    if (this.load) {
      const componentFactory =
        this._componentFactoryResolver.resolveComponentFactory(LoaderComponent);
      const componentRef =
        this._viewContainerRef.createComponent(componentFactory);
      componentRef.instance.background = this.background;
      componentRef.instance.opacity = this.opacity;
      if (this.backgroundColor) {
        componentRef.instance.backgroundColor = this.backgroundColor;
      }
      this._renderer.setStyle(host, 'min-height', this.minHeight + 'px');
      host.insertBefore(componentRef.location.nativeElement, host.firstChild);
    } else {
      if (host.firstChild && host.firstChild.localName === 'app-loader') {
        host.firstChild.remove();
        this._renderer.removeStyle(host, 'min-height');
      }
    }
  }
}
