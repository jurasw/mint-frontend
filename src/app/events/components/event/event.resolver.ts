import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IEvent } from 'src/app/events/models/event.model';
import { EventService } from 'src/app/events/services/event.service';

@Injectable()
export class EventResolver implements Resolve<IEvent> {
  constructor(private _eventService: EventService, private _router: Router) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEvent> {
    const id = route.paramMap.get('id');
    if (id) {
      return this._eventService.getEvent(+id);
    } else {
      this._router.navigate(['/404']);
      return of();
    }
  }
}
