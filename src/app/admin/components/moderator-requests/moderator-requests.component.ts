import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IForum } from 'src/app/forum/models/forum.interface';
import { IRequest } from '../../models/request.model';
import { ApiAdminService } from '../../services/api-admin.service';

@Component({
  selector: 'app-moderator-requests',
  templateUrl: './moderator-requests.component.html',
  styleUrls: ['./moderator-requests.component.scss']
})
export class ModeratorRequestsComponent implements OnInit {
  public component = 'moderator-requests';
  public moderatorRequests!: Observable<number[]>;
  constructor(private _adminService: ApiAdminService) { }

  public ngOnInit(): void {
    this._getAllRequests();
  }

  private _getAllRequests(): void {
    this.moderatorRequests = this._adminService.getForums().pipe(switchMap((forums: IForum[]) => {
      const requests$: Observable<IRequest[]>[] = [];
      forums.forEach((forum: IForum) => {
        requests$.push(this._adminService.getModeratorRequests(forum.id));
      });
      return forkJoin(requests$);
    }, )).pipe(map((forumRequests: IRequest[][]) => forumRequests.map((requests: IRequest[]) => {
      requests = requests.filter((r: IRequest) => r.status === 0);
      return requests.length;
    })));
  }
}
