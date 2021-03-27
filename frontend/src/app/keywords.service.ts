import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {
  private keywordsObservable = new Subject<string[]>();

  constructor() { }

  setKeywords(x: string[]) {
    this.keywordsObservable.next(x);
  }

  getKeywords(): Observable<string[]> {
    return this.keywordsObservable.asObservable();
  }
}
