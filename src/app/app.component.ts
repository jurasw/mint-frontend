import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GuardsCheckEnd, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from './chat/services/chat.service';
import { OpenviduService } from './events/services/openvidu.service';
import { SurveyService } from './survey/services/survey.service';
import { AuthenticationService } from './_core/services/authentication.service';
import { NotificationService } from './_core/services/notification.service';
import { SessionStorageService } from './_core/services/sessionstorage.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public showChatBubbles = false;
  private _subscription: Subscription = new Subscription();
  private _routerSubscription: Subscription = new Subscription();
  private _userSubscription: Subscription = new Subscription();
  private _openviduSubsription: Subscription = new Subscription();
  constructor(
    public authService: AuthenticationService,
    public router: Router,
    private _chatService: ChatService,
    private _openviduService: OpenviduService,
    private _sessionStorageService: SessionStorageService,
    private _notificationService: NotificationService,
    private _surveyService: SurveyService
  ) {
    this.authService.getUserFromStorage();
    this._getOpenViduToken();
  }

  public ngOnInit(): void {
    this._getOpenViduToken();
    this._subscribeToLoggedUser();
    this._subscribeToRoute();
    registerLocaleData(localePl);
  }

  private _subscribeToLoggedUser(): void {
    this._userSubscription = this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this._chatService.chatConnection();
        this._notificationService.notificationConnection();
      } else {
        this._chatService.disconnect();
        this._notificationService.disconnect();
        this._sessionStorageService.removeItem('openvidu-token');
      }
    });
  }

  private _getOpenViduToken(): void {
    if (!this._openviduService.token && this.authService.currentUser) {
      this._openviduService.getOpenviduToken().subscribe((openviduToken: string) => {
        this._sessionStorageService.setItem('openvidu-token', openviduToken);
      });
    }
  }

  private _subscribeToRoute(): void {
    this._routerSubscription = this.router.events.subscribe((res: any) => {
      if (res instanceof NavigationEnd || res instanceof GuardsCheckEnd) {
        this.showChatBubbles = !(
          res.url.includes('/messages') ||
          res.url.includes('/landing-page') ||
          res.url.includes('/openvidu-session') ||
          res.url.includes('/mobile/about-us')
        );
      }
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
    this._routerSubscription.unsubscribe();
    this._userSubscription.unsubscribe();
    this._openviduSubsription.unsubscribe();
  }
}
