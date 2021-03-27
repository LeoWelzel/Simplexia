import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcronymsService {
  private acronymsObservable = new Subject<object>();

  constructor() { }

  setAcronyms(x: object) {
    this.acronymsObservable.next(x);
  }

  getAcronyms(): Observable<object> {
    return this.acronymsObservable.asObservable();
  }
}
