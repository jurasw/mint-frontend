import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { ICurrentUserData } from '../models/user.interface';
import { LocalStorageService } from './localstorage.service';
import { SessionStorageService } from './sessionstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser$!: BehaviorSubject<ICurrentUserData | undefined>;
  public currentUser: ICurrentUserData | undefined;
  public rememberPassword = false;
  constructor(
    private _localStorage: LocalStorageService,
    private _sessionStorage: SessionStorageService,
    private _router: Router
  ) {}

  public getUserFromStorage(): void {
    const localUser = JSON.parse(this._localStorage.getItem('currentUser'));
    const sessionUser = JSON.parse(this._sessionStorage.getItem('currentUser'));
    const user: ICurrentUserData = localUser || sessionUser;
    this.rememberPassword = !!localUser;
    this.currentUser = user;
    this.currentUser$ = new BehaviorSubject<ICurrentUserData | undefined>(user);
  }

  public decodeToken(
    token: string,
    rememberPassword = false
  ): ICurrentUserData {
    const decodedToken = jwt_decode(token);
    this.currentUser = this._parseCurrentUserData(token, decodedToken);
    this.currentUser$.next(this.currentUser);
    this.rememberPassword = rememberPassword;
    if (rememberPassword) {
      this._localStorage.setItem(
        'currentUser',
        JSON.stringify({ ...this.currentUser })
      );
    } else {
      this._sessionStorage.setItem(
        'currentUser',
        JSON.stringify({ ...this.currentUser })
      );
    }

    return this.currentUser;
  }

  public get currentUserValue(): ICurrentUserData | undefined {
    return this.currentUser$.value;
  }

  public get isUserAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.role === 'Admin';
    }
    return false;
  }

  public get isUserWorker(): boolean {
    if (this.currentUser) {
      return (
        this.currentUser.role === 'Specialist' ||
        this.currentUser.role === 'Admin'
      );
    } else {
      return false;
    }
  }

  public get isUserSpecialist(): boolean {
    if (this.currentUser) {
      return this.currentUser.role === 'Specialist';
    } else {
      return false;
    }
  }

  public logout(): void {
    if (this.rememberPassword) {
      this._localStorage.removeItem('currentUser');
    } else {
      this._sessionStorage.removeItem('currentUser');
    }
    this.currentUser = undefined;
    this.currentUser$.next(undefined);
    this._router.navigateByUrl('/auth/login').then(() => {
      window.location.reload();
    });
  }

  private _parseCurrentUserData(
    token: string,
    decodedToken: any
  ): ICurrentUserData {
    const currentUser: ICurrentUserData = {
      name: '',
      id: 0,
      role: '',
      premium: false,
      nickName: '',
      groups: [],
      token: '',
    };
    currentUser.token = token;
    for (const key of Object.keys(decodedToken)) {
      const keyWords = key.split('/');
      const parsedKey = keyWords[keyWords.length - 1];
      switch (parsedKey) {
        case 'nameidentifier':
          currentUser.id = +decodedToken[key];
          break;
        case 'name':
          currentUser.name = decodedToken[key];
          break;
        case 'role':
          currentUser.role = decodedToken[key];
          break;
        case 'premium':
          currentUser.premium = !!decodedToken[key];
          break;
        case 'nickName':
          currentUser.nickName = decodedToken[key];
          break;
        case 'groups':
          currentUser.groups = JSON.parse(decodedToken[key]);
          break;
      }
    }
    return currentUser;
  }
}
