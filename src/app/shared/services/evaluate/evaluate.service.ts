import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {EvaluateClient} from '../../models/evaluate-client';
import {EvaluateClientResult} from '../../models/evaluate-client-result';
import {environment} from '../../../../environments/environment';


const URL = environment.url;


@Injectable({
    providedIn: 'root'
})
export class EvaluateService {

    constructor(private http: HttpClient) {
    }

    evaluateClient(client: EvaluateClient) {
        return this.http.post<EvaluateClientResult>(`${URL}/inference/v1/score?orient=RECORDS`, client)
            .pipe(
                map(x => x.records),
                // map(x => {
                //     x.forEach((x, i) => x.score = i / 100);
                //     return x;
                // })
            )
    }
}
