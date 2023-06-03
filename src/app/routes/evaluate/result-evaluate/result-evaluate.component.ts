import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../shared/services/toast/toast.service";
import {EvaluateService} from "../../../shared/services/evaluate/evaluate.service";
import {CacheService} from "src/app/shared/services/cache/cache.service";
import {EvaluateClientRecordResult} from "src/app/shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";

@Component({
    selector: "app-result-evaluate",
    templateUrl: "./result-evaluate.component.html",
    styleUrls: ["./result-evaluate.component.scss"],
})
export class ResultEvaluateComponent implements OnInit {
    evaluateResult!: EvaluateClientRecordResult[];
    evaluateResultTotal!: number;

    optionsScore!: EChartsOption;
    optionsScoreValueSelect!: EChartsOption;
    optionsForecasting!: EChartsOption;

    valueSelect!: number;

    constructor(
        private toastService: ToastService,
        private router: Router,
        private evaluateService: EvaluateService,
        private cacheService: CacheService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe({
            next: () => this.loadScreen()
        });
    }

    private loadScreen() {
        const value = this.cacheService.get<EvaluateClientRecordResult[]>("evaluate");

        if (!value) {
            this.router.navigateByUrl("/evaluate");
            return;
        }

        this.evaluateResult = value!;
        this.evaluateResultTotal = this.evaluateResult
            .map(x => x.score)
            .reduce((a, b) => a + b, 0) / this.evaluateResult.length;
        this.valueSelect = 0;

        this.setOptionsChartScore();
        this.setOptionsChartValueSelect();
        this.setOptionsChartForecasting();
    }

    updateChartValueSelect() {
        this.setOptionsChartValueSelect();
    }

    private setOptionsChartValueSelect() {
        this.optionsScoreValueSelect = {
            series: [
                {
                    type: 'gauge',
                    startAngle: 90,
                    endAngle: -270,
                    max: 100,
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
                        {value: Math.round(this.evaluateResult[this.valueSelect].score * 100), name: 'Score'},
                    ],
                },
            ],
        };
    }

    private setOptionsChartScore() {
        this.optionsScore = {
            radar: {
                indicator: this.evaluateResult.map((_, i) => {
                    return {name: `#${i}`, max: 1};
                })
            },
            series: [
                {
                    type: 'radar',
                    data: [
                        {
                            value: this.evaluateResult.map(x => x.score),
                        }
                    ]
                }
            ]
        };
    }

    private setOptionsChartForecasting() {
        this.optionsForecasting = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.evaluateResult.map(x => x.day),
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: this.evaluateResult.map(x => x.score),
                    type: 'line',
                    areaStyle: {}
                }
            ]
        };
    }
}
