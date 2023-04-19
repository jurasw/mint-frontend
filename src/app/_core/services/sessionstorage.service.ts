import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
  constructor() {}

  public setItem(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item;
  }

  public removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }
  public clear(): void {
    sessionStorage.clear();
  }
}
