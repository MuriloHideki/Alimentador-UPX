import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feeder } from '../classes/feeder';
import { Observable, catchError } from 'rxjs';
import { FeederResponse } from '../classes/feeder-response';
import { FeederData } from '../classes/feeder-data';

@Injectable({
  providedIn: 'root'
})
export class FeederService {
  private baseUrl ='http://localhost:3000/feeders';
  constructor(private http: HttpClient) {};

  getAllFeeders(): Observable<FeederResponse<FeederData>> {
    return this.http.get<FeederResponse<FeederData>>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      );
  }

  getById(id: string): Observable<FeederResponse<Feeder>> {
    return this.http.get<FeederResponse<Feeder>>(this.baseUrl+'/'+id)
    .pipe(
      catchError(error => {
        console.error('Ocorreu um erro:', error);
        throw error;
      })
    );
  }

  createFeeder(feeder: Feeder): Observable<FeederResponse<void>> {
    return this.http.post<FeederResponse<void>>(this.baseUrl, feeder)
      .pipe(
        catchError(error => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      );
  }

  updateFeeder(id: string, feeder: Feeder): Observable<FeederResponse<void>> {
    return this.http.put<FeederResponse<void>>(this.baseUrl+'/'+id, feeder)
      .pipe(
        catchError(error => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      );
  }

  deleteFeeder(id: string): Observable<FeederResponse<void>> {
    return this.http.delete<FeederResponse<void>>(this.baseUrl+'/'+id)
      .pipe(
        catchError(error => {
          console.error('Ocorreu um erro:', error);
          throw error;
        })
      );
  }
}
