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
import defineSelectChartOption from "./define-select-chart-option";
import defineRadarChartOption from "./define-radar-chart-option";
import defineForecastChartOption from "./define-forecast-chart-option";
import defineCalendarChartOption from "./define-calendar-chart-option";
import {EvaluateClientResultAllShifts} from "../../../shared/models/evaluate-client-result-all-shifts";
import {shifts} from "../../../shared/models/shifts";
import * as stat from 'simple-statistics';
import defineSummaryBoxplotChartOption from "./define-summary-boxplot-chart-option";
import defineSummaryBarChartOption from "./define-summary-bar-chart-option";
import defineTimelineChartOption from "./define-timeline-chart-option";
import defineTimelineYearChartOption from "./define-timeline-year-chart-option";

@Component({
    selector: "app-result-evaluate",
    templateUrl: "./result-evaluate.component.html",
    styleUrls: ["./result-evaluate.component.scss"],
})
export class ResultEvaluateComponent implements OnInit {
    evaluateResult!: EvaluateClientRecordResult[];
    evaluateResultAverage!: EvaluateClientResultAllShifts;

    optionSummaryBarChart!: EChartsOption;
    optionSummaryBoxplotChart!: EChartsOption;
    optionSummaryBarMonthChart!: EChartsOption;
    optionTimelineYearChart!: EChartsOption;
    optionTimelineChart!: EChartsOption;
    optionRadarChart!: EChartsOption;
    optionSelectChart!: EChartsOption;
    optionForecastChart!: EChartsOption;
    optionCalendarChart!: EChartsOption;

    months!: { id: number; name: string; }[];
    monthSelect!: number;
    shifts!: { id: string; name: string; }[];
    shiftSelect!: string;

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

        this.loadData(value);
    }

    private loadData(value: EvaluateClientRecordResult[]) {
        this.evaluateResult = value;

        this.months = new Date().getMonthsNames();
        this.monthSelect = 1;
        this.shifts = shifts;
        this.shiftSelect = 'NIGHT';

        this.loadDataLabels(value);
    }

    loadDataLabels(value: EvaluateClientRecordResult[]) {
        this.evaluateResultAverage = {
            total: this.calcAverage(value, ['DAWN', 'MORNING', 'NIGHT']),
            dawn: this.calcAverage(value, ['DAWN']),
            morning: this.calcAverage(value, ['MORNING']),
            night: this.calcAverage(value, ['NIGHT']),

            totalMonth: this.calcAverageOnMonth(value, ['DAWN', 'MORNING', 'NIGHT']),
            dawnMonth: this.calcAverageOnMonth(value, ['DAWN']),
            morningMonth: this.calcAverageOnMonth(value, ['MORNING']),
            nightMonth: this.calcAverageOnMonth(value, ['NIGHT']),
        };

        this.setSummaryBarChartOption();
        this.setSummaryBoxplotChartOption();
        this.setSummaryBarMonthChartOption();
        this.setTimelineYearChartOption();
        this.setTimelineChartOption();
        this.setRadarChartOption();
        this.setSelectChartOption();
        this.setForecastChartOption();
        this.setCalendarChartOption();
    }

    private filterOnMonthSelected(data: EvaluateClientRecordResult[]): EvaluateClientRecordResult[] {
        return this.filterOnMonth(data, this.monthSelect);
    }

    private filterOnMonth(data: EvaluateClientRecordResult[], month: number): EvaluateClientRecordResult[] {
        let monthText = '' + month;

        if (month < 10) {
            monthText = `0${month}`;
        }

        return data.filter(x => x.day.includes(`-${monthText}-`));
    }

    private filterOnShift(data: EvaluateClientRecordResult[], shift: string[]): EvaluateClientRecordResult[] {
        return data.filter(x => shift.includes(x.shift));
    }

    private calcAverageOnMonth(data: EvaluateClientRecordResult[], shift: string[]) {
        const values = this.filterOnMonthSelected(data);

        return this.calcAverage(values, shift);
    }

    private calcAverage(data: EvaluateClientRecordResult[], shift: string[]) {
        const dataOnShifts = this.filterOnShift(data, shift);

        return stat.average(dataOnShifts.map(x => x.score))

        // const sum = dataOnShifts.map((x) => x.score)
        //     .reduce((a, b) => a + b, 0);
        //
        // return (sum / dataOnShifts.length) || 0;
    }

    updateResult(event: EvaluateClientRecordResult[]) {
        this.loadData(event);

        this.toastService.show("Resultado atualizado.");
    }

    updateAllLabels() {
        this.loadDataLabels(this.evaluateResult);
    }

    private setRadarChartOption() {
        this.optionRadarChart = defineRadarChartOption(
            [
                'Score Localização',
                'Score Veículo',
                'Score Cliente'
            ],
            [
                this.evaluateResultAverage.total,
                0.0,
                0.0
            ]
        );
    }

    private setSelectChartOption() {
        const value = this.calcAverage(this.evaluateResult, ['DAWN', 'MORNING', 'NIGHT']);
        this.optionSelectChart = defineSelectChartOption(value);
    }

    private setForecastChartOption() {
        const data = this.filterOnMonthSelected(this.evaluateResult)
        this.optionForecastChart = defineForecastChartOption(
            this.filterOnShift(data, ['DAWN']),
            this.filterOnShift(data, ['MORNING']),
            this.filterOnShift(data, ['NIGHT'])
        );
    }

    private setCalendarChartOption() {
        const data = this.filterOnShift(this.filterOnMonthSelected(this.evaluateResult), [this.shiftSelect]);
        this.optionCalendarChart = defineCalendarChartOption(data, this.monthSelect);
    }

    private setTimelineYearChartOption() {
        this.optionTimelineYearChart = defineTimelineYearChartOption(
            this.months.map(x => x.name),
            this.months.map(x => this.calcAverage(this.filterOnMonth(this.evaluateResult, x.id), ['DAWN', 'MORNING', 'NIGHT'])),
            this.months.map(x => this.calcAverage(this.filterOnMonth(this.evaluateResult, x.id), ['DAWN'])),
            this.months.map(x => this.calcAverage(this.filterOnMonth(this.evaluateResult, x.id), ['MORNING'])),
            this.months.map(x => this.calcAverage(this.filterOnMonth(this.evaluateResult, x.id), ['NIGHT']))
        );
    }

    private setTimelineChartOption() {
        this.optionTimelineChart = defineTimelineChartOption(
            this.filterOnShift(this.evaluateResult, ['DAWN']),
            this.filterOnShift(this.evaluateResult, ['MORNING']),
            this.filterOnShift(this.evaluateResult, ['NIGHT'])
        );
    }

    private setSummaryBarChartOption() {
        this.optionSummaryBarChart = defineSummaryBarChartOption(
            this.evaluateResultAverage.total,
            this.evaluateResultAverage.dawn,
            this.evaluateResultAverage.morning,
            this.evaluateResultAverage.night
        );
    }

    private setSummaryBoxplotChartOption() {
        const all = this.filterOnShift(this.evaluateResult, ['DAWN', 'MORNING', 'NIGHT']);
        const dawn = this.filterOnShift(this.evaluateResult, ['DAWN']);
        const morning = this.filterOnShift(this.evaluateResult, ['MORNING']);
        const night = this.filterOnShift(this.evaluateResult, ['NIGHT']);

        this.optionSummaryBoxplotChart = defineSummaryBoxplotChartOption([all, dawn, morning, night]);
    }

    private setSummaryBarMonthChartOption() {
        this.optionSummaryBarMonthChart = defineSummaryBarChartOption(
            this.evaluateResultAverage.totalMonth,
            this.evaluateResultAverage.dawnMonth,
            this.evaluateResultAverage.morningMonth,
            this.evaluateResultAverage.nightMonth
        );
    }
}
