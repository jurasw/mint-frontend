import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  constructor() {}

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item;
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
  public clear(): void {
    localStorage.clear();
  }
}
