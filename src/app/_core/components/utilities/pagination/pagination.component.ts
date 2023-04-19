import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPaginationData } from '../../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() public paginationData!: IPaginationData;
  @Input() public maxSize = 10;
  @Output() public pageChanged$: EventEmitter<number> = new EventEmitter();
  constructor() {}

  public ngOnInit(): void {}

  public pageChanged(event: number): void {
    this.pageChanged$.emit(event);
  }
}
