import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ToastService} from "../../../shared/services/toast/toast.service";
import {filter} from "rxjs";

@Component({
    selector: 'app-result-evaluate',
    templateUrl: './result-evaluate.component.html',
    styleUrls: ['./result-evaluate.component.scss']
})
export class ResultEvaluateComponent implements OnInit {

    evaluateResult: any;

    constructor(private formBuilder: FormBuilder, private toastService: ToastService, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe({next: value => console.log(value)});
        this.activatedRoute.params.subscribe({next: value => console.log(value)});
        console.log(this.router.getCurrentNavigation()?.extras.state);
        // this.router.events
        //     .pipe(filter(e => e instanceof NavigationStart))
        //     .subscribe({
        //         next: (e) => {
        //             const nav = this.router.getCurrentNavigation()
        //             if (!nav || !nav?.extras.state) {
        //                 this.router.navigateByUrl('/evaluate');
        //             }
        //             this.evaluateResult = nav?.extras.state;
        //             this.toastService.show(JSON.stringify(this.evaluateResult));
        //             // console.log(this.evaluateResult);
        //         },
        //         error: (err) => {
        //             console.error(err);
        //             this.router.navigateByUrl('/evaluate');
        //         }
        //     })
    }
}
