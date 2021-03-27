import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutputVisibilityService {
  private visibilityObservable = new Subject<boolean>();

  constructor() { }

  setVisibility(x: boolean) {
    this.visibilityObservable.next(x);
  }

  getVisibility(): Observable<boolean> {
    return this.visibilityObservable.asObservable();
  }
}
