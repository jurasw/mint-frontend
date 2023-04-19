import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_core/services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public loginRequired = false;
  public sidePanel = false;
  public headerPanel = false;
  public infoPanel = false;
  public registrationPanel = false;
  public forumHeader = false;
  public calendarHeader = false;
  public profileMainViewHeader = false;
  public communicatorHeader = false;
  public surveyHeader = false;
  public userProfileHeader = false;
  public stickyNavbar = false;
  public addContentPadding = true;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public authService: AuthenticationService,
    public router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  @HostListener('window:scroll', [])
  public onLayoutScrollChange(): void {
    this.stickyNavbar = window.scrollY > 100;
  }

  public ngOnInit(): void {
    this._activatedRoute.data.subscribe((data) => {
      this.loginRequired = data.loginRequired;
      this.sidePanel = data.sidePanel;
      this.headerPanel = data.headerPanel;
      this.infoPanel = data.infoPanel;
      this.registrationPanel = data.registrationPanel;
      this.forumHeader = data.forumHeader;
      this.calendarHeader = data.calendarHeader;
      this.profileMainViewHeader = data.profileMainViewHeader;
      this.communicatorHeader = data.communicatorHeader;
      this.surveyHeader = data.surveyHeader;
      this.userProfileHeader = data.userProfileHeader;

      if (data.addContentPadding) {
        this.addContentPadding = data.addContentPadding;
      }
    });
  }

  public openWindow(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/landing-page/contact'])
    );

    window.open(url, '_blank');
  }
}
