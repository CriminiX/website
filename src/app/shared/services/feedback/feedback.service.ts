import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CriminixIdService} from "../criminix-id/criminix-id.service";
import {delay, of} from "rxjs";
import {Feedback} from "../../models/feedback";

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
      private http: HttpClient,
      private criminixIdService: CriminixIdService
  ) { }

  sendFeedback(feedback: Feedback) {
    const criminixId = this.criminixIdService.get();

    // TODO: Chamar servico de feedback
    return of(null).pipe(delay(2000));
  }
}
