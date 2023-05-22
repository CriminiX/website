import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  get<T>(key: string): T | undefined {
    const contentString = sessionStorage.getItem(key);

    if (contentString === null) {
      return undefined;
    }

    return JSON.parse(contentString);
  }

  save<T>(key: string, content: T) {
    const stringContent = JSON.stringify(content);

    sessionStorage.setItem(key, stringContent);
  }

  delete(key: string) {
    sessionStorage.removeItem(key);
  }
}
