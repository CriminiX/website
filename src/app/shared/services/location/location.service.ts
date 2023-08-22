import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, delay, map, of, throwError} from "rxjs";
import {LocationsSearchResult} from "../../models/locations-search-result";
import {environment} from "../../../../environments/environment";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  searchLocationByCep(cep?: string) {
    return of({
      city: "São Paulo",
      neighborhood: "Centro"
    }).pipe(delay(1000));
  }

  searchCity(city?: string) {
    if (city === undefined) {
      return of([]);
    }

    return this.http
        .get<LocationsSearchResult>(`${URL}/location/v1/search`, {
          params: { city },
        })
        .pipe(
            map((x) => x.cidades || []),
            catchError((err) => {
              if (err.status === 404) {
                return of([]);
              }

              return throwError(() => err);
            })
        );
  }

  searchNeighborhood(city: string, neighborhood?: string) {
    if (neighborhood === undefined) {
      return of([]);
    }

    return this.http
        .get<LocationsSearchResult>(`${URL}/location/v1/search`, {
          params: { city, neighborhood },
        })
        .pipe(
            map((x) => x.bairros || []),
            catchError((err) => {
              if (err.status === 404) {
                return of([]);
              }

              return throwError(() => err);
            })
        );
  }
}
