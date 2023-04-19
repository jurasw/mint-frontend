import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ITab } from 'src/app/_core/models/tab.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {

  public mainTabs: ITab[] = [
    { name: 'Strona główna', url: '/landing-page/main-page' },
    { name: 'Blog', url: '/make-dreams' },
    { name: 'O nas', url: '/about-us' },
    { name: 'O projekcie', url: '/about-project' },
  ];
  
  public additionalTabs: ITab[] = [
    { name: 'O psychoterapii', url: '/landing-page/aboutPsych' },
    { name: 'O zespole', url: '/landing-page/about-us' },
    { name: 'Cennik', url: '/landing-page/priceList' },
    { name: 'Kontakt', url: '/landing-page/contact' },
  ];

  constructor(public router: Router) {}

  public ngOnInit(): void {}
}
