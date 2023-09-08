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

  getLocal<T>(key: string): T | undefined {
    const contentString = localStorage.getItem(key);

    if (contentString === null) {
      return undefined;
    }

    return JSON.parse(contentString);
  }

  save<T>(key: string, content: T) {
    const stringContent = JSON.stringify(content);

    sessionStorage.setItem(key, stringContent);
  }

  saveLocal<T>(key: string, content: T) {
    const stringContent = JSON.stringify(content);

    localStorage.setItem(key, stringContent);
  }

  saveOnList<T>(key: string, content: T) {
    const oldContents = this.get<T[]>(key);

    if (!oldContents) {
      const contents = [content];

      this.save(key, contents);

      return;
    }

    const newContents: T[] = [...oldContents!, content];

    this.save(key, newContents);
  }

  delete(key: string) {
    sessionStorage.removeItem(key);
  }

  removeOnList<T>(key: string, index: number) {

    const content = this.get<T[]>(key);

    if (!content) {
      return;
    }

    const newContents = content.filter((value, i) => index !== i);

    this.save(key, newContents);
  }
}
