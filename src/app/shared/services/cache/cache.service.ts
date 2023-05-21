import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService <T> {

  constructor() { }

  get(key: string): T | undefined {
    const contentString = sessionStorage.getItem(key);

    if (contentString === null) {
      return undefined;
    }

    return JSON.parse(contentString);
  }

  save(key: string, content: T) {
    const stringContent = JSON.stringify(content);

    sessionStorage.setItem(key, stringContent);
  }
}
