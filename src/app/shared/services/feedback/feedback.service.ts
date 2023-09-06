import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CriminixIdService} from "../criminix-id/criminix-id.service";
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

    const headers = new HttpHeaders({
      "Criminix-Id": criminixId
    });

    return this.http
      .post(`${URL}/research/v1/response-user`, feedback, { headers });
  }
}
