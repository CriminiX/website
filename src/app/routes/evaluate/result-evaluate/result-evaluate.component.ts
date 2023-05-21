import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationStart, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ToastService } from "../../../shared/services/toast/toast.service";
import { filter } from "rxjs";
import { EvaluateService } from "../../../shared/services/evaluate/evaluate.service";
import { CacheService } from "src/app/shared/services/cache/cache.service";
import { EvaluateClientResult } from "src/app/shared/models/evaluate-client-result";

@Component({
  selector: "app-result-evaluate",
  templateUrl: "./result-evaluate.component.html",
  styleUrls: ["./result-evaluate.component.scss"],
})
export class ResultEvaluateComponent implements OnInit {
  evaluateResult!: EvaluateClientResult;

  constructor(
    private toastService: ToastService,
    private router: Router,
    private evaluateService: EvaluateService,
    private cacheService: CacheService<EvaluateClientResult>
  ) {}

  ngOnInit(): void {
    const value = this.cacheService.get("evaluate");

    if (!value) {
      this.router.navigateByUrl("/evaluate");
      return;
    }

    this.evaluateResult = value;
    // .subscribe({
    //   next: (value) => {
    //     if (!value) {
    //       this.router.navigateByUrl("/evaluate");
    //       return;
    //     }
    //     this.evaluateResult = value;
    //   },
    //   error: (err) => {
    //     this.toastService.show(err);
    //     this.router.navigateByUrl("/evaluate");
    //   },
    // });
  }
}
