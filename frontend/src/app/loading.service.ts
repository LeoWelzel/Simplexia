import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingObservable = new Subject<boolean>();

  constructor() { }

  setLoading(x: boolean) {
    this.loadingObservable.next(x);
  }

  getLoading(): Observable<boolean> {
    return this.loadingObservable.asObservable();
  }
}
