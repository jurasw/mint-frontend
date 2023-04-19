import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() public id!: number;
  @Input() public message!: string;
  @Input() public classColor = 'primary';
  @Output() public badgeClosed$: EventEmitter<number> = new EventEmitter();
  constructor() { }

  public ngOnInit(): void {
  }

  public onBadgeClose(): void {
    this.badgeClosed$.emit(this.id);
  }
}
