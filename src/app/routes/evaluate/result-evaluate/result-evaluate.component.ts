import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ToastService} from "../../../shared/services/toast/toast.service";
import {filter} from "rxjs";
import {EvaluateService} from "../../../shared/services/evaluate/evaluate.service";
import {CacheService} from "src/app/shared/services/cache/cache.service";
import {EvaluateClientResult} from "src/app/shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";

@Component({
    selector: "app-result-evaluate",
    templateUrl: "./result-evaluate.component.html",
    styleUrls: ["./result-evaluate.component.scss"],
})
export class ResultEvaluateComponent implements OnInit {
    evaluateResult!: EvaluateClientResult;
    // scoreProgressBar: number = 0.0;

    optionsScore!: EChartsOption;
    optionsScoreValue1!: EChartsOption;
    optionsForecasting!: EChartsOption;

    constructor(
        private toastService: ToastService,
        private router: Router,
        private evaluateService: EvaluateService,
        private cacheService: CacheService
    ) {
    }

    ngOnInit(): void {
        const value = this.cacheService.get<EvaluateClientResult>("evaluate");

        if (!value) {
            this.router.navigateByUrl("/evaluate");
            return;
        }

        this.evaluateResult = value!;
        // this.scoreProgressBar = this.evaluateResult.score * 20;

        this.setChartScore();
        this.setChartValue1();
        this.setChartForecasting();
    }

    private setChartValue1() {
        this.optionsScoreValue1 = {
            series: [
                {
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    max: 5,
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        clip: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    detail: {
                        width: 50,
                        height: 14,
                        fontSize: 14,
                        color: 'inherit',
                        borderColor: 'inherit',
                        borderRadius: 20,
                        borderWidth: 1
                    },
                    data: [
                        {value: this.evaluateResult.value1, name: 'Score'},
                    ],
                },
            ],
        };
    }

    private setChartScore() {
        this.optionsScore = {
            radar: {
                indicator: [
                    {name: 'Value1', max: 5},
                    {name: 'Value2', max: 5},
                    {name: 'Value3', max: 5},
                ]
            },
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: [this.evaluateResult.value1, this.evaluateResult.value2, this.evaluateResult.value3],
                        }
                    ]
                }
            ]
        };
    }

    private setChartForecasting() {
        this.optionsForecasting = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: this.evaluateResult.months,
                    type: 'line',
                    areaStyle: {}
                }
            ]
        };
    }
}
