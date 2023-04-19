import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class AnimationService {
  constructor() {}

  public addAnimation(
    renderer: Renderer2,
    element: HTMLElement,
    className: string
  ): void {
    renderer.addClass(element, className);
  }

  public removeAnimation(
    renderer: Renderer2,
    element: HTMLElement,
    className: string,
    period = 0
  ): void {
    if (period) {
      setTimeout(() => {
        renderer.removeClass(element, className);
      }, period);
    } else {
      renderer.removeClass(element, className);
    }
  }
}
