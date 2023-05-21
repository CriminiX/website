import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { delay, of, pipe } from "rxjs";
import { ToastService } from "../../shared/services/toast/toast.service";
import { ActivatedRoute, Router } from "@angular/router";
import { EvaluateService } from "../../shared/services/evaluate/evaluate.service";

declare var particlesJS: any;

@Component({
  selector: "app-evaluate",
  templateUrl: "./evaluate.component.html",
  styleUrls: ["./evaluate.component.scss"],
})
export class EvaluateComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    particlesJS.load(
      "particles-js",
      "../../../assets/particlesjs-config-evaluate.json",
      null
    );
  }
}
