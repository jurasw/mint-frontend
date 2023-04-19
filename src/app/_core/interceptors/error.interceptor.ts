import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthenticationService,
    private _errorService: ErrorService,
    private _router: Router
  ) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 403) {
          this._errorService.emitError('Brak uprawnień');
        }
        if (!err.error) {
          return throwError(err);
        }
        const errorObject =
          typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
        const message = errorObject.message;
        const messages = errorObject.errors;
        if (
          err.status === 401 ||
          (err.status === 500 && message === 'User is not authenticated')
        ) {
          this._authService.logout();
        }
        if (
          err.status === 400 &&
          (errorObject.error === 'NotConfirm' ||
            errorObject.error === 'UserNotActive')
        ) {
          this._router.navigate(['/auth/register/confirm-account'], {
            state: { userId: errorObject.userId, verificationMethod: errorObject.verificationMethod, code: true },
          });
        }

        if (messages) {
          this._errorService.emitError(Object.values(messages));
        } else if (message) {
          this._errorService.emitError(message);
        }

        return throwError(errorObject);
      })
    );
  }
}
