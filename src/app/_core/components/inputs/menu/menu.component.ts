import { Direction } from '@angular/cdk/bidi';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { IMenuItem } from '../../../models/menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() public menuItems: IMenuItem[] = [];
  @Input() public isLoading!: boolean;
  @Input() public direction: Direction = 'ltr';
  @Input() public xPosition: MenuPositionX = 'after';
  @Input() public yPosition: MenuPositionY = 'below';
  @Output() public menuItemClicked$ = new EventEmitter<IMenuItem>();
  @Output() public menuIconClicked$ = new EventEmitter<boolean>();
  constructor() {}

  public ngOnInit(): void {}

  public menuItemClicked(item: IMenuItem): void {
    this.menuItemClicked$.emit(item);
  }

  public menuIconClick(): void {
    this.menuIconClicked$.emit();
  }
}
