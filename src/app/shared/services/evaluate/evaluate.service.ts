import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';
import { EvaluateClient, EvaluateClientModel } from '../../models/evaluate-client';
import { EvaluateClientResult, EvaluateClientResultModel } from '../../models/evaluate-client-result';
import { environment } from '../../../../environments/environment';


const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class EvaluateService {

  // private result: BehaviorSubject<EvaluateClientResultModel>;

  constructor(private http: HttpClient) { 
    // this.result = new BehaviorSubject<EvaluateClientResultModel>(undefined);
  }

  // getResult() {
  //   return this.result.asObservable();
  // }

  // saveResult(result: EvaluateClientResult) {
  //   this.result.next(result);
  // }

  evaluateClient(client: EvaluateClient) {
     return this.http.get<EvaluateClientResult>(`${URL}/1`)
      .pipe(
        delay(500), 
        map(x => x)
      )
  }
}
