import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-cookies-info',
  templateUrl: './cookies-info.component.html',
  styleUrls: ['./cookies-info.component.scss']
})
export class CookiesInfoComponent implements OnInit {
  public showCookieInfo = true;
  constructor(private _localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    const storageItem = this._localStorageService.getItem('showCookieInfo');
    this.showCookieInfo = storageItem ? storageItem === 'true' : true;
  }

  public openFile(file: string): void {
    window.open(file);
  }

  public closeCookieInfo(): void {
    this.showCookieInfo = false;
    this._localStorageService.setItem('showCookieInfo', false);
  }
}
