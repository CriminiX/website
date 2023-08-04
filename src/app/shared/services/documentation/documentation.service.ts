import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  private docState!: BehaviorSubject<string>;
  private doc!: Observable<string>;

  constructor() {
    this.reset();
  }

  reset() {
    this.docState = new BehaviorSubject<string>("");
    this.doc = this.docState.asObservable();
  }

  get() {
    return this.doc;
  }

  set(value: string) {
    this.docState.next(value);
  }
}
