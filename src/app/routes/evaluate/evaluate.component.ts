import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {delay, of, pipe} from "rxjs";
import {ToastService} from "../../shared/services/toast/toast.service";
import {ActivatedRoute, Router} from "@angular/router";

declare var particlesJS: any;

@Component({
    selector: 'app-evaluate',
    templateUrl: './evaluate.component.html',
    styleUrls: ['./evaluate.component.scss']
})
export class EvaluateComponent implements OnInit {


    evaluateForm!: FormGroup;
    loading = false;

    constructor(private formBuilder: FormBuilder, private toastService: ToastService, private router: Router) {
    }

    ngOnInit(): void {
        particlesJS.load('particles-js', '../../../assets/particlesjs-config-evaluate.json', null);

        this.evaluateForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    evaluate(evaluateFormElement: FormGroupDirective) {
        this.loading = true;
        of(null).pipe(delay(500)).subscribe({
            next: async (_) => {
                // this.toastService.show("OK.")
                await this.router.navigateByUrl('/evaluate/result', {state: {example: 'ok'}})
            },
            error: (err) => {
                this.toastService.show(err)
            },
            complete: () => this.loading = false
        });
    }
}
