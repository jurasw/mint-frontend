import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public _currentError$: Subject<any> = new Subject<any>();
  constructor() {}

  get currentError$(): Subject<any> {
    return this._currentError$;
  }

  public emitError(err: any): void {
    this._currentError$.next(err);
  }
}
