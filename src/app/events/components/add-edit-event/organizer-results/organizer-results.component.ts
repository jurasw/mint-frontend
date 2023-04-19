import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IUser } from 'src/app/_core/models/user.interface';

export interface IOrganizer {
  selected: boolean;
  user: IUser;
}

@Component({
  selector: 'app-organizer-results',
  templateUrl: './organizer-results.component.html',
  styleUrls: ['./organizer-results.component.scss']
})
export class OrganizerResultsComponent implements OnInit, OnChanges {
  @Input() public searchUsers: IUser[] = [];
  @Input() public organizers: IUser[] = [];
  @Input() public moreResultsLoading = false;
  @Output() public scrollBottom$: EventEmitter<void> = new EventEmitter();
  @Output() public resultClicked$: EventEmitter<IUser> = new EventEmitter();
  public organizerResults: IOrganizer[] = [];
  public showLimitInformation = false;

  constructor() { }

  public ngOnInit(): void {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchUsers && changes.searchUsers.currentValue) {
      this.setOrganizerResults();
    }
    if (changes.organizers && changes.organizers.currentValue) {
      this.showLimitInformation = this.organizers.length >= 10;
      this.organizerResults.forEach(result => {
        result.selected = this.checkOrganizerSelection(result.user);
      });
    }
  }

  public setOrganizerResults(): void {
    this.organizerResults = [];
    this.searchUsers.forEach((user) => {
      const selected = this.checkOrganizerSelection(user);
      this.organizerResults.push({
        user, selected
      });
    });
  }

  public checkOrganizerSelection(user: IUser): boolean {
    return !!this.organizers.filter(o => o.id === user.id)[0];
  }

  @HostListener('window.scroll', ['$event'])
  public onScrollBottom(event: any): void {
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.scrollBottom$.emit();
    }
  }

  public onClickResult(user: IUser | undefined): void {
    if (this.organizers.length < 10 && user) {
      const organizer = this.organizerResults.find(x => x.user.id === user.id);
      if (organizer) {
        organizer.selected = true;
      }
      this.resultClicked$.emit(user);
    }
  }
}
