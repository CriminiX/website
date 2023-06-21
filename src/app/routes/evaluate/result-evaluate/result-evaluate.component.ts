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
import defineGaugeChartOption from "./define-gauge-chart-option";
import defineRadarChartOption from "./define-radar-chart-option";
import defineCalendarChartOption from "./define-calendar-chart-option";
import {EvaluateClientResultAllShifts} from "../../../shared/models/evaluate-client-result-all-shifts";
import {shifts} from "../../../shared/models/shifts";
import * as stat from 'simple-statistics';
import defineSummaryBoxplotChartOption from "./define-summary-boxplot-chart-option";
import defineSummaryBarChartOption from "./define-summary-bar-chart-option";
import defineTimelineChartOption from "./define-timeline-chart-option";
import defineTimelineYearChartOption from "./define-timeline-year-chart-option";
import {EvaluateClientHistory} from "../../../shared/models/evaluate-client-history";

@Component({
    selector: "app-result-evaluate",
    templateUrl: "./result-evaluate.component.html",
    styleUrls: ["./result-evaluate.component.scss"],
})
export class ResultEvaluateComponent implements OnInit {
    evaluateResult!: EvaluateClientRecordResult[][];
    evaluateResultAverage!: EvaluateClientResultAllShifts;

    optionSummaryBarChart!: EChartsOption;
    optionSummaryBoxplotChart!: EChartsOption;
    optionSummaryBarMonthChart!: EChartsOption;
    optionTimelineYearChart!: EChartsOption;
    optionTimelineChart!: EChartsOption;
    optionRadarChart!: EChartsOption;
    optionGaugeChart!: EChartsOption;
    optionCalendarChart!: EChartsOption;

    months!: { id: number; name: string; }[];
    monthSelect!: number;
    shifts!: { id: string; name: string; }[];
    shiftSelect!: string;
    locations!: string[];
    locationCalendar!: number;

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
            this.cacheService.get<EvaluateClientRecordResult[][]>("evaluate");

        if (!value) {
            this.router.navigateByUrl("/evaluate");
            return;
        }

        this.loadData(value);
    }

    private loadData(value: EvaluateClientRecordResult[][]) {
        this.evaluateResult = value;

        const historyId = this.cacheService.get<string>("evaluate-form")!;
        const history = this.cacheService.get<EvaluateClientHistory[]>("evaluate-history")!;
        const evaluateForm = history.find(x => x.id === historyId)!;

        this.months = new Date().getMonthsNames();
        this.monthSelect = 1;
        this.shifts = shifts;
        this.shiftSelect = 'NIGHT';
        this.locations = evaluateForm.locations
            .map(x => `${x.city}, ${x.neighborhood}`);
        this.locationCalendar = 0;

        this.loadDataLabels(value);
    }

    loadDataLabels(value: EvaluateClientRecordResult[][]) {
        const valuesFlat = value.flat();

        this.evaluateResultAverage = {
            total: this.calcAverage(valuesFlat, ['DAWN', 'MORNING', 'NIGHT']),
            dawn: this.calcAverage(valuesFlat, ['DAWN']),
            morning: this.calcAverage(valuesFlat, ['MORNING']),
            night: this.calcAverage(valuesFlat, ['NIGHT']),
        };

        this.setSummaryBarChartOption();
        this.setSummaryBoxplotChartOption();
        this.setSummaryBarMonthChartOption();
        this.setTimelineYearChartOption();
        this.setTimelineChartOption();
        this.setRadarChartOption();
        this.setGaugeChartOption();
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

    updateResult(event: EvaluateClientRecordResult[][]) {
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

    // TODO: Arrumar labels do legend do gauge
    private setGaugeChartOption() {
        const value = this.evaluateResult.map(v => this.calcAverage(v, ['DAWN', 'MORNING', 'NIGHT']));
        this.optionGaugeChart = defineGaugeChartOption(this.locations.map(v => v.replace(', ', '\n')), value);
    }

    // TODO: Colocar opção de selecionar o bairro
    private setCalendarChartOption() {
        const data = this.filterOnShift(this.filterOnMonthSelected(this.evaluateResult[this.locationCalendar]), [this.shiftSelect]);
        this.optionCalendarChart = defineCalendarChartOption(this.months[this.monthSelect].name, this.monthSelect, data);
    }

    private setTimelineYearChartOption() {
        this.optionTimelineYearChart = defineTimelineYearChartOption(
            this.months.map(x => x.name),
            this.locations.flatMap(x => [`Geral (${x})`, `Manhã (${x})`, `Tarde (${x})`, `Noite (${x})`]),
            this.evaluateResult.flatMap(r => [
                this.months.map(x => this.calcAverage(this.filterOnMonth(r, x.id), ['DAWN', 'MORNING', 'NIGHT'])),
                this.months.map(x => this.calcAverage(this.filterOnMonth(r, x.id), ['DAWN'])),
                this.months.map(x => this.calcAverage(this.filterOnMonth(r, x.id), ['MORNING'])),
                this.months.map(x => this.calcAverage(this.filterOnMonth(r, x.id), ['NIGHT']))
            ])
        );
    }

    // TODO: Corrigir gráfico
    private setTimelineChartOption() {
        this.optionTimelineChart = defineTimelineChartOption(
            this.locations.map(x => [`Manhã (${x})`, `Tarde (${x})`, `Noite (${x})`]),
            this.evaluateResult.map(v => [
                this.filterOnShift(v, ['DAWN']),
                this.filterOnShift(v, ['MORNING']),
                this.filterOnShift(v, ['NIGHT'])
            ])
        );
    }

    private setSummaryBarChartOption() {
        this.optionSummaryBarChart = defineSummaryBarChartOption(
            ['Score Médio', 'Score Médio Manhã', 'Score Médio Tarde', 'Score Médio Noite'],
            this.locations,
            this.evaluateResult.map(v => [
                this.calcAverage(v, ['DAWN', 'MORNING', 'NIGHT']),
                this.calcAverage(v, ['DAWN']),
                this.calcAverage(v, ['MORNING']),
                this.calcAverage(v, ['NIGHT']),
            ])
        );
    }

    private setSummaryBoxplotChartOption() {
        this.optionSummaryBoxplotChart = defineSummaryBoxplotChartOption(
            ['Score Geral', 'Score Manhã', 'Score Tarde', 'Score Noite'],
            this.locations,
            this.evaluateResult.map(v => [
                this.filterOnShift(v, ['DAWN', 'MORNING', 'NIGHT']),
                this.filterOnShift(v, ['DAWN']),
                this.filterOnShift(v, ['MORNING']),
                this.filterOnShift(v, ['NIGHT']),
            ]));
    }

    private setSummaryBarMonthChartOption() {
        this.optionSummaryBarMonthChart = defineSummaryBarChartOption(
            ['Score Médio', 'Score Médio Manhã', 'Score Médio Tarde', 'Score Médio Noite'],
            this.locations,
            this.evaluateResult.map(v => [
                this.calcAverageOnMonth(v, ['DAWN', 'MORNING', 'NIGHT']),
                this.calcAverageOnMonth(v, ['DAWN']),
                this.calcAverageOnMonth(v, ['MORNING']),
                this.calcAverageOnMonth(v, ['NIGHT']),
            ])
        );
    }
}
