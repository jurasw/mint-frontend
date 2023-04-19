import { Component, Input, OnInit } from '@angular/core';
import { IForum } from 'src/app/forum/models/forum.interface';
import { ModeratorService } from 'src/app/forum/services/moderator.service';
import { IUser } from 'src/app/_core/models/user.interface';

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.scss'],
})
export class ModeratorsComponent implements OnInit {
  @Input() public forum!: IForum;
  @Input() public userId!: number;
  @Input() public moderators!: IUser[];
  @Input() public isUserAdmin!: boolean;
  @Input() public isUserModerator!: boolean;
  constructor(private _moderatorService: ModeratorService) {}

  public ngOnInit(): void {}

  public resign(): void {
    this._moderatorService
      .deleteModerator(this.forum.id, this.userId)
      .subscribe(() => {
        location.reload();
      });
  }
}
