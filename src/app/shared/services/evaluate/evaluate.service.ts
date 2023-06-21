import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {forkJoin, map, Observable, timeout} from "rxjs";
import {EvaluateClient} from "../../models/evaluate-client";
import {EvaluateClientRecordResult, EvaluateClientResult} from "../../models/evaluate-client-result";
import {environment} from "../../../../environments/environment";
import {toEvaluateClientWithShift} from "../../adapters/evaluate-client";

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
                timeout(30_000),
                map((x) =>
                    x.records.map((x) => {
                        return {...x, day: "2023-" + x.day};
                    })
                )
            );
    }

    evaluateClientAllShifts(client: EvaluateClient[]): Observable<EvaluateClientRecordResult[][]> {
        return forkJoin({
            dawn: forkJoin(client.map(x => this.evaluateClient(toEvaluateClientWithShift(x, "DAWN")))),
            morning: forkJoin(client.map(x => this.evaluateClient(toEvaluateClientWithShift(x, "MORNING")))),
            night: forkJoin(client.map(x => this.evaluateClient(toEvaluateClientWithShift(x, "NIGHT")))),
        }).pipe(
            map(x => {
                let result = [];
                for (let index = 0; index < x.dawn.length; index++) {
                    result.push([x.dawn[index], x.morning[index], x.night[index]].flat())
                }
                return result;
            })
        );
    }
}
