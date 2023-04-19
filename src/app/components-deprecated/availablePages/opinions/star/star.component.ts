import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  @Input() public starId = 0;
  @Input() public rating = 0;

  @Output() public starEnter: EventEmitter<number> = new EventEmitter();
  @Output() public starLeave: EventEmitter<number> = new EventEmitter();
  @Output() public starClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {
  }

  public onStarEnter(): any {
    this.starEnter.emit(this.starId);
  }
  public onStarLeave(): any {
    this.starLeave.emit(this.starId);
  }
  public onStarClicked(): any {
    this.starClicked.emit(this.starId);
  }

}
