import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/forum/models/posts.interface';

@Component({
  selector: 'app-accordion-card',
  templateUrl: './accordion-card.component.html',
  styleUrls: ['./accordion-card.component.scss'],
})
export class AccordionCardComponent implements OnInit {
  @Input() public title: string | undefined;
  @Input() public id: string | number | undefined;
  public openAccordion = false;
  constructor() {}

  public ngOnInit(): void {}
}
