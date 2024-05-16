import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { History, HistoryResponse } from '../classes/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = 'http://localhost:3000/feeders';

  constructor(private http: HttpClient) {}

  getHistoryByFeederId(feederId: string): Observable<History[]> {
    return this.http.get<HistoryResponse>(`${this.apiUrl}/${feederId}/history`)
      .pipe(
        map((response: HistoryResponse) => response.data.history)
      );
  }
}
