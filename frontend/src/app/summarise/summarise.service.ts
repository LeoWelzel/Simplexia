import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { DEFAULT_SUMMARY, Summary } from './summary.model';

const serverAddress = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class SummariseService {
  private summary: Summary = DEFAULT_SUMMARY;
  private summaryObservable = new Subject<Summary>();

  constructor(private httpClient: HttpClient) {}

  /* Uses DeepAI API. */
  summarise(inputText: string) {
    const summaryData = new FormData();
    summaryData.append('text', inputText);

    this.httpClient
      .post<Summary>(
        serverAddress, { text: inputText }
      )
      .subscribe(
        (result: {
          summarise: { indices: Array<Array<number>>, valid: boolean};
          keyword: { words: Array<string>, valid: boolean};
          acronyms: object;
        }) => {
          this.summary = {
            summarise: result.summarise,
            keyword: result.keyword,
            acronyms: result.acronyms,
            lastSent: inputText
          };
          this.summaryObservable.next(this.summary);
        }
      )
  }

  getSummary(): Observable<Summary> {
    return this.summaryObservable.asObservable();
  }
}
