import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { ErrorService } from '../services/error.service';
import { SessionStorageService } from '../services/sessionstorage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthenticationService,
    private _errorService: ErrorService,
    private _sessionStorageService: SessionStorageService
  ) {}
  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this._authService.currentUser &&
      this._authService.currentUser.token) {
      let authorizationHeader;
      if (request.url.includes(environment.API_URL)) {

        authorizationHeader = {
          Authorization: `Bearer ${this._authService.currentUser.token}`,
        };
      } else if (request.url.includes(environment.OPENVIDU_API_URL) && this._sessionStorageService.getItem('openvidu-token')){
        authorizationHeader = {
          Authorization: `Basic ${this._sessionStorageService.getItem('openvidu-token')}`,
        };
      }
      request = request.clone({
        setHeaders: { ...authorizationHeader },
      });
    }

    return next.handle(request).pipe(
      tap((event: any) => {
        if (event && event.statusText === 'OK') {
          this._errorService.emitError('');
        }
      })
    );
  }
}
