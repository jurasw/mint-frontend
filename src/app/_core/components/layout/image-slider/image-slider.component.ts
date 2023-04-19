import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss']
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  @Input() public images: string[] = [];
  @Input() public imageTitles: string[] = [];
  public slideIndex = 0;
  private _imageInterval!: any;
  private _intervalFunction = () => {
    if (this.slideIndex === this.images.length - 1) {
      this.slideIndex = 0;
    } else {
      this.slideIndex++;
    }
  }
  constructor() { }

  public ngOnInit(): void {
    this._changeImageInterval();
  }

  public changeSlideIndex(i: number): void {
    this.slideIndex = i;
    clearInterval(this._imageInterval);
    this._imageInterval = setInterval(this._intervalFunction, 5000);
  }

  private _changeImageInterval(): void {
    this._imageInterval = setInterval(this._intervalFunction, 5000);
  }

  public ngOnDestroy(): void {
    clearInterval(this._imageInterval);
  }
}
