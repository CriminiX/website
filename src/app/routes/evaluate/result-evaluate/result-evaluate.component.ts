import {
    Component,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../shared/services/toast/toast.service";
import {EvaluateService} from "../../../shared/services/evaluate/evaluate.service";
import {CacheService} from "src/app/shared/services/cache/cache.service";
import {EvaluateClientRecordResult} from "src/app/shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";
import "src/app/shared/extensions/number.extensions";
import {format, parse} from "date-fns";

@Component({
    selector: "app-result-evaluate",
    templateUrl: "./result-evaluate.component.html",
    styleUrls: ["./result-evaluate.component.scss"],
})
export class ResultEvaluateComponent implements OnInit {
    evaluateResult!: EvaluateClientRecordResult[];
    evaluateResultAverage!: number;

    optionsScore!: EChartsOption;
    optionsScoreValueSelect!: EChartsOption;
    optionsForecasting!: EChartsOption;
    optionsCalendar!: EChartsOption;

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
            next: () => this.loadScreen(),
        });
    }

    private loadScreen() {
        const value =
            this.cacheService.get<EvaluateClientRecordResult[]>("evaluate");

        if (!value) {
            this.router.navigateByUrl("/evaluate");
            return;
        }

        this.evaluateResult = value!;
        this.evaluateResultAverage =
            this.evaluateResult.map((x) => x.score).reduce((a, b) => a + b, 0) /
            this.evaluateResult.length;
        this.valueSelect = 0;

        this.setOptionsChartScore();
        this.setOptionsChartValueSelect();
        this.setOptionsChartForecasting();
        this.setOptionsChartCalendar();
    }

    updateChartValueSelect() {
        this.setOptionsChartValueSelect();
    }

    private setOptionsChartValueSelect() {
        this.optionsScoreValueSelect = {
            series: {
                type: "gauge",
                center: ['50%', '75%'],
                startAngle: 180,
                endAngle: 0,
                radius: '90%',
                max: 1,
                pointer: {
                    show: false,
                },
                progress: {
                    show: true,
                    overlap: false,
                    clip: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: true,
                },
                detail: {
                    offsetCenter: [0, '-15%'],
                    width: 50,
                    height: 14,
                    fontSize: 14,
                    color: "inherit",
                    borderColor: "inherit",
                    borderRadius: 20,
                    borderWidth: 1,
                },
                data: [
                    {
                        value: this.evaluateResult[this.valueSelect].score.round(2)
                    },
                ],
            },
        };
    }

    private setOptionsChartScore() {
        this.optionsScore = {
            radar: {
                indicator: this.evaluateResult.map((x, i) => {
                    return {name: x.day, max: 1};
                }),
            },
            series: [
                {
                    label: {
                        show: true,
                        formatter: (params: any) => params.value.toFixed(2),
                        fontSize: '10px'
                    },
                    type: "radar",
                    data: [
                        {
                            value: this.evaluateResult.map((x) => x.score),
                        },
                    ],
                },
            ],
        };
    }

    private setOptionsChartForecasting() {
        this.optionsForecasting = {
            tooltip: {
                formatter: (params: any) => 'Score: ' + params.value.toFixed(2)
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: this.evaluateResult.map((x) => x.day),
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: this.evaluateResult.map((x) => x.score),
                    type: "line",
                    areaStyle: {},
                },
            ],
        };
    }

    private setOptionsChartCalendar() {

        const month = format(new Date().from(this.evaluateResult[0].day), "yyyy-MM")
        const formatDate = (date: string) => format(new Date().from(date), "yyyy-MM-dd");

        this.optionsCalendar = {
            tooltip: {
                formatter: (params: any) => 'Score: ' + params.value[1].toFixed(2)
            },
            visualMap: {
                show: false,
                min: 0,
                max: 1,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: 20,
                controller: {
                    inRange: {
                        opacity: 0.5
                    }
                }
            },
            calendar: {
                left: 'center',
                top: 'middle',
                cellSize: [50, 50],
                yearLabel: {
                    show: false
                },
                orient: 'vertical',
                dayLabel: {
                    nameMap: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
                },
                monthLabel: {
                    show: false
                },
                range: month
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: this.evaluateResult.map((x) => [formatDate(x.day), x.score])
            }
        };
    }
}
