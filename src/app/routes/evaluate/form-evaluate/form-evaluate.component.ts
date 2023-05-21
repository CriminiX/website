import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { EvaluateClientResult } from "src/app/shared/models/evaluate-client-result";
import { CacheService } from "src/app/shared/services/cache/cache.service";
import { EvaluateService } from "src/app/shared/services/evaluate/evaluate.service";
import { ToastService } from "src/app/shared/services/toast/toast.service";

@Component({
  selector: "app-form-evaluate",
  templateUrl: "./form-evaluate.component.html",
  styleUrls: ["./form-evaluate.component.scss"],
})
export class FormEvaluateComponent implements OnInit {
  evaluateForm!: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private evaluateService: EvaluateService,
    private cacheService: CacheService<EvaluateClientResult>
  ) {}

  ngOnInit(): void {
    this.evaluateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
    });
  }

  evaluate(evaluateFormElement: FormGroupDirective) {
    this.loading = true;
    this.evaluateService.evaluateClient({}).subscribe({
      next: async (value) => {
        this.cacheService.save("evaluate", value);
        // this.evaluateService.saveResult(value);
        await this.router.navigateByUrl("/evaluate/result");
      },
      error: (err) => {
        this.toastService.show(err);
      },
      complete: () => (this.loading = false),
    });
  }
}
