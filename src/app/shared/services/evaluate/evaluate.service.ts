import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {forkJoin, map, Observable} from "rxjs";
import {EvaluateClient} from "../../models/evaluate-client";
import {EvaluateClientRecordResult, EvaluateClientResult} from "../../models/evaluate-client-result";
import {environment} from "../../../../environments/environment";

const URL = environment.url;

@Injectable({
    providedIn: "root",
})
export class EvaluateService {
    constructor(private http: HttpClient) {
    }

    evaluateClient(client: EvaluateClient): Observable<EvaluateClientRecordResult[]> {
        return this.http
            .post<EvaluateClientResult>(
                `${URL}/inference/v1/score?orient=RECORDS`,
                client
            )
            .pipe(
                map((x) =>
                    x.records.map((x) => {
                        return {...x, day: "2023-" + x.day};
                    })
                )
            );
    }

    evaluateClientAllShifts(client: EvaluateClient): Observable<EvaluateClientRecordResult[]> {
        const year = new Date().getFullYear();
        const clientAllTime: EvaluateClient = {...client, period: {begin: `${year}-01-01`, end: `${year}-12-31`}}

        return forkJoin({
            dawn: this.evaluateClient({...clientAllTime, shift: "DAWN"}),
            morning: this.evaluateClient({...clientAllTime, shift: "MORNING"}),
            night: this.evaluateClient({...clientAllTime, shift: "NIGHT"})
        }).pipe(
            map(x => [...x.dawn, ...x.morning, ...x.night])
        );
    }
}
