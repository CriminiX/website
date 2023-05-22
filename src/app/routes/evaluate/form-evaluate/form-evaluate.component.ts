import {Component, Input, OnInit} from "@angular/core";
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
import {EvaluateClient} from "../../../shared/models/evaluate-client";

@Component({
  selector: "app-form-evaluate",
  templateUrl: "./form-evaluate.component.html",
  styleUrls: ["./form-evaluate.component.scss"],
})
export class FormEvaluateComponent implements OnInit {
  evaluateForm!: FormGroup;
  loading = false;

  @Input() formResult: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private evaluateService: EvaluateService,
    private cacheService: CacheService
  ) {}

  ngOnInit(): void {
    this.evaluateForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(2)]],
    });

    if (this.formResult) {
      this.setCachedData();
    }
  }

  private setCachedData() {
    const data = this.cacheService.get<EvaluateClient>("evaluate-form");

    if (!data) {
      return;
    }

    this.evaluateForm.controls["name"].setValue(data.name);
  }

  evaluate() {
    this.loading = true;

    const evaluateClient = this.evaluateForm.getRawValue() as EvaluateClient;

    this.evaluateService.evaluateClient(evaluateClient).subscribe({
      next: async (value) => {
        this.cacheService.save<EvaluateClient>("evaluate-form", evaluateClient);
        this.cacheService.save<EvaluateClientResult>("evaluate", value);
        await this.router.navigateByUrl("/evaluate/result");
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.toastService.show("Erro ao Simular Cliente.");
        this.loading = false;
      }
    });
  }
}
