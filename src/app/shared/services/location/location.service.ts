import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, throwError} from "rxjs";
import {LocationsSearchRecordsResult, LocationsSearchResult} from "../../models/locations-search-records-result";
import {environment} from "../../../../environments/environment";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  searchLocationByCep(cep?: string): Observable<(LocationsSearchRecordsResult | null)> {
    if (cep === undefined) {
        return of(null);
    }

    return this.http
        .get<LocationsSearchResult>(`${URL}/location/v1/search`, {
            params: { zip_code: cep },
        })
        .pipe(
            map((x) => x.records[0] || null),
            catchError((err) => {
                if (err.status === 404) {
                    return of(null);
                }

                return throwError(() => err);
            })
        )
  }

  searchCity(city?: string): Observable<string[]> {
    if (city === undefined) {
      return of([]);
    }

    return this.http
        .get<LocationsSearchResult>(`${URL}/location/v1/search`, {
          params: { city },
        })
        .pipe(
            map((x) => x.records
                .filter((x) => x.city !== undefined)
                .map(y => y.city!)),
            catchError((err) => {
              if (err.status === 404) {
                return of([]);
              }

              return throwError(() => err);
            })
        );
  }

  searchNeighborhood(city: string, neighborhood?: string): Observable<string[]> {
    if (neighborhood === undefined) {
      return of([]);
    }

    return this.http
        .get<LocationsSearchResult>(`${URL}/location/v1/search`, {
          params: { city, neighborhood },
        })
        .pipe(
            map((x) => x.records
                .filter((x) => x.neighborhood !== undefined)
                .map(y => y.neighborhood!)),
            catchError((err) => {
              if (err.status === 404) {
                return of([]);
              }

              return throwError(() => err);
            })
        );
  }
}
