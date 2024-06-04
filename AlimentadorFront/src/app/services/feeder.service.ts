import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Feeder } from '../classes/feeder';
import { Observable, catchError, map } from 'rxjs';
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

  getFeedersByCityAndNeighborhood(city: string, neighborhood?: string): Observable<Feeder[]> {
    let params = new HttpParams().set('city', city);
    if (neighborhood) {
      params = params.set('neighborhood', neighborhood);
    }
    return this.http.get<{status: string, data: {feeders: Feeder[]}}>(`${this.baseUrl}/search`, { params }).pipe(
      map(response => response.data.feeders),
      catchError(error => {
        throw new Error('Error fetching feeders by city and neighborhood');
      })
    );
  }

  getCities(): Observable<string[]> {
    return this.http.get<{status: string, data: {cities: string[]}}>(`${this.baseUrl}/cities`).pipe(
      map(response => response.data.cities),
      catchError(error => {
        throw new Error('Error fetching cities');
      })
    );
  }

  getNeighborhoodsByCity(city: string): Observable<string[]> {
    return this.http.get<{status: string, data: {neighborhoods: string[]}}>(`${this.baseUrl}/neighborhoods/${city}`).pipe(
      map(response => response.data.neighborhoods),
      catchError(error => {
        throw new Error('Error fetching neighborhoods');
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
