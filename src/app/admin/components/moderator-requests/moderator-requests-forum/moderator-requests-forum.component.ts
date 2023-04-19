import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IRequest } from 'src/app/admin/models/request.model';
import { ApiAdminService } from 'src/app/admin/services/api-admin.service';
import { ModeratorRequestModalComponent } from '../moderator-request-modal/moderator-request-modal.component';

@Component({
  selector: 'app-moderator-requests-forum',
  templateUrl: './moderator-requests-forum.component.html',
  styleUrls: ['./moderator-requests-forum.component.scss']
})
export class ModeratorRequestsForumComponent implements OnInit {
  public moderatorRequests$ = new Observable<IRequest[]>();
  public forumId!: number;
  public isLoading = false;

  constructor(private _dialog: MatDialog, private _activatedRoute: ActivatedRoute, private _adminService: ApiAdminService) { }

  public ngOnInit(): void {
    this.isLoading = true;
    this.forumId = +this._activatedRoute.snapshot.params.id;
    this.moderatorRequests$ = this._adminService.getModeratorRequests(this.forumId).pipe(
      map(requests => requests.filter((request: IRequest) => request.status === 0)),
      tap(_ => this.isLoading = false)
    );
  }

  public openDialog(request: IRequest): void {
    this._dialog.open(ModeratorRequestModalComponent, {
      data: {
        request,
        forumId: this.forumId
      }
    });
  }
}
