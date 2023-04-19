import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IForum } from 'src/app/forum/models/forum.interface';
import { ApiAdminService } from '../../services/api-admin.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.scss']
})
export class ForumListComponent implements OnInit {
  @Input() public component!: string;
  @Input() public counter!: number[] | null;

  public isLoading = false;
  public forums$ = new Observable<IForum[]>();

  constructor(private _apiAdminService: ApiAdminService, private _router: Router) { }

  public ngOnInit(): void {
    this.getForums();
  }

  public getForums(): void {
    this.isLoading = true;
    this.forums$ = this._apiAdminService.getForums().pipe(
      tap(_ => this.isLoading = false)
    );
  }

  public navigateToSubpage(path: string, forumId: number): void {
    const route = 'admin/' + path + '/' + forumId;
    this._router.navigate([route]);
  }
}
