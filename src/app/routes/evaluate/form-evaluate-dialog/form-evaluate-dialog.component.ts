import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-form-evaluate-dialog',
    templateUrl: './form-evaluate-dialog.component.html',
    styleUrls: ['./form-evaluate-dialog.component.scss']
})
export class FormEvaluateDialogComponent implements OnInit {

    evaluateForm!: FormGroup;

    constructor(private dialogRef: MatDialogRef<FormEvaluateDialogComponent>, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.evaluateForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    evaluate(evaluateFormElement: FormGroupDirective) {
        this.dialogRef.close();
    }
}
