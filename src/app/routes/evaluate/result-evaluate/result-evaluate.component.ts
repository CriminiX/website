import {
    Component,
    OnInit
} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../../../shared/services/toast/toast.service";
import {EvaluateService} from "../../../shared/services/evaluate/evaluate.service";
import {CacheService} from "src/app/shared/services/cache/cache.service";
import {EvaluateClientRecordResult} from "src/app/shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";
import "src/app/shared/extensions/number.extensions";
import defineGaugeChartOption from "./define-gauge-chart-option";
import defineCalendarChartOption from "./define-calendar-chart-option";
import {shifts} from "../../../shared/models/shifts";
import * as stat from 'simple-statistics';
import defineSummaryBoxplotChartOption from "./define-summary-boxplot-chart-option";
import defineSummaryBarChartOption from "./define-summary-bar-chart-option";
import defineTimelineChartOption from "./define-timeline-chart-option";
import defineTimelineYearChartOption from "./define-timeline-year-chart-option";
import {EvaluateClientHistory} from "../../../shared/models/evaluate-client-history";
import definePictorialSummaryChartOption from "./define-pictorial-summary-chart-option";
import {MatDialog} from "@angular/material/dialog";
import {FeedbackEvaluateDialogComponent} from "../feedback-evaluate-dialog/feedback-evaluate-dialog.component";
import {FeedbackEvaluateDialogContent} from "../feedback-evaluate-dialog/feedback-evaluate-dialog-content";
import {timer} from "rxjs";

@Component({
    selector: "app-result-evaluate",
    templateUrl: "./result-evaluate.component.html",
    styleUrls: ["./result-evaluate.component.scss"],
})
export class ResultEvaluateComponent implements OnInit {
    evaluateResult!: EvaluateClientRecordResult[][];

    optionPictorialSummaryChart!: EChartsOption;
    optionSummaryBarChart!: EChartsOption;
    optionSummaryBoxplotChart!: EChartsOption;
    optionTimelineYearChart!: EChartsOption;
    optionTimelineChart!: EChartsOption;
    optionGaugeChart!: EChartsOption;
    optionCalendarChart!: EChartsOption;

    months!: { id: number; name: string; }[];
    monthsPlusAll!: { id: number; name: string; }[];
    monthBarSelect!: number;
    monthCalendarSelect!: number
    shifts!: { id: string; name: string; }[];
    shiftsGeneral!: { id: string; name: string; }[];
    shiftsAll!: { id: string; name: string; }[];
    shiftMonthSummary!: string;
    shiftTimelineYear!: string[];
    shiftTimeline!: string;
    locations!: string[];
    locationCalendar!: number;
    locationsAverageScore!: number;

    feedbackData!: FeedbackEvaluateDialogContent[];
    feedbackSent!: boolean;

    constructor(
        private toastService: ToastService,
        private router: Router,
        private evaluateService: EvaluateService,
        private cacheService: CacheService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
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

    private loadData(value: EvaluateClientRecordResult[][], loadFeedback = true) {
        this.evaluateResult = value;

        const historyId = this.cacheService.get<string>("evaluate-form")!;
        const history = this.cacheService.get<EvaluateClientHistory[]>("evaluate-history")!;
        const evaluateForm = history.find(x => x.id === historyId)!;

        this.months = new Date().getMonthsNames();
        this.monthsPlusAll = [{id: 0, name: "Todos"}, ...this.months];
        this.monthBarSelect = 0;
        this.monthCalendarSelect = new Date().getMonth() + 1;
        this.shifts = shifts;
        this.shiftsGeneral = [{id: "GENERAL", name: 'Geral'}, ...shifts];
        this.shiftsAll = [{id: "ALL", name: 'Todos'}, ...shifts];
        this.shiftMonthSummary = 'ALL';
        this.shiftTimelineYear = this.evaluateResult.length > 1
            ? ['GENERAL']
            : this.shiftsGeneral.map(x => x.id);
        this.shiftTimeline = this.evaluateResult.length > 1 ? 'NIGHT' : 'ALL';
        this.locations = evaluateForm.locations
            .map(x => `${x.city}, ${x.neighborhood}`);
        this.locationCalendar = 0;

        if (loadFeedback) {
            this.feedbackSent = false;
        }
        this.feedbackData = this.evaluateResult.map((x, i) => {
            return {
                score: this.calcAverage(x, ['DAWN', 'MORNING', 'NIGHT']).round(0),
                city: evaluateForm.locations[i].city,
                neighborhood: evaluateForm.locations[i].neighborhood
            }
        });

        this.loadDataLabels();

        if (loadFeedback) {
            this.toastService.notify("Não se esqueça de nos enviar um feedback!");
            timer(30_000).subscribe({
                next: () => {
                    if (!this.feedbackSent) {
                        this.openFeedback();
                    }
                }
            });
        }
    }

    loadDataLabels() {
        this.setPictorialSummaryChartOption();
        this.setSummaryBarChartOption();
        this.setSummaryBoxplotChartOption();
        this.setTimelineYearChartOption();
        this.setTimelineChartOption();
        this.setGaugeChartOption();
        this.setCalendarChartOption();
    }

    openFeedback() {
        const feedbackDialog = this.dialog.open<FeedbackEvaluateDialogComponent, FeedbackEvaluateDialogContent[]>(FeedbackEvaluateDialogComponent, {
            panelClass: 'dialog-container-tiny',
            data: this.feedbackData
        });
        feedbackDialog.afterClosed().subscribe({
            next: () => {
                this.feedbackSent = true;
            },
            error: () => {
                this.feedbackSent = true;
            }
        });
    }

    private groupBy<T>(xs: T[], key: string): {[key: string]: T[]} {
        return xs.reduce(function(rv: {[key: string]: T[]}, x: any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    private filterOnMonthSelected(data: EvaluateClientRecordResult[], month: number): EvaluateClientRecordResult[] {
        return this.filterOnMonth(data, month);
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

    private calcAverageOnMonth(data: EvaluateClientRecordResult[], month: number, shift: string[]) {
        const values = this.filterOnMonthSelected(data, month);

        return this.calcAverage(values, shift);
    }

    private calcAverage(data: EvaluateClientRecordResult[], shift: string[]) {
        const dataOnShifts = this.filterOnShift(data, shift);

        return stat.average(dataOnShifts.map(x => x.score));
    }

    updateResult(event: EvaluateClientRecordResult[][]) {
        this.loadData(event, false);

        this.toastService.show("Resultado atualizado.");
    }

    updateAllLabels() {
        this.loadDataLabels();
    }

    private setPictorialSummaryChartOption() {
        this.locationsAverageScore = stat.average(this.evaluateResult.map(x => stat.average(x.map(y => y.score))));
        this.optionPictorialSummaryChart = definePictorialSummaryChartOption("Média Localizações", this.locationsAverageScore);
    }

    private setGaugeChartOption() {
        const value = this.evaluateResult.map(v => this.calcAverage(v, ['DAWN', 'MORNING', 'NIGHT']));
        this.optionGaugeChart = defineGaugeChartOption(this.locations.map(v => v.replace(', ', '\n')), value);
    }

    private setCalendarChartOption() {
        let data = this.filterOnShift(
            this.filterOnMonthSelected(
                this.evaluateResult[this.locationCalendar],
                this.monthCalendarSelect
            ),
            this.shiftMonthSummary === "ALL"
                ? ['DAWN', 'MORNING', 'NIGHT']
                : [this.shiftMonthSummary]
        );
        if (this.shiftMonthSummary === "ALL") {

            const dataGroupedByDay = this.groupBy(data, 'day');
            const dataAllShifts = Object.keys(dataGroupedByDay).map(day => {
                return {
                    day,
                    score: stat.average(dataGroupedByDay[day].map(x => x.score))
                }
            });
            this.optionCalendarChart = defineCalendarChartOption(this.months[this.monthCalendarSelect - 1].name, this.monthCalendarSelect, dataAllShifts);

            return;
        }

        this.optionCalendarChart = defineCalendarChartOption(this.months[this.monthCalendarSelect - 1].name, this.monthCalendarSelect, data);
    }

    private setTimelineYearChartOption() {
        this.optionTimelineYearChart = defineTimelineYearChartOption(
            this.months.map(x => x.name),
            this.locations.flatMap(x => [
                this.shiftTimelineYear.includes('GENERAL') ? `Geral (${x})` : undefined,
                this.shiftTimelineYear.includes('DAWN') ? `Manhã (${x})` : undefined,
                this.shiftTimelineYear.includes('MORNING') ? `Tarde (${x})` : undefined,
                this.shiftTimelineYear.includes('NIGHT') ? `Noite (${x})` : undefined
            ].filter(x => x !== undefined).map(x => x!)),
            this.evaluateResult.flatMap(r => [
                this.shiftTimelineYear.includes('GENERAL')
                    ? this.months.map(x => this.calcAverage(this.filterOnMonth(r, x.id), ['DAWN', 'MORNING', 'NIGHT']))
                    : undefined,
                this.shiftTimelineYear.includes('DAWN')
                    ? this.months.map(x => this.calcAverage(this.filterOnMonth(r, x.id), ['DAWN']))
                    : undefined,
                this.shiftTimelineYear.includes('MORNING')
                    ? this.months.map(x => this.calcAverage(this.filterOnMonth(r, x.id), ['MORNING']))
                    : undefined,
                this.shiftTimelineYear.includes('NIGHT')
                    ? this.months.map(x => this.calcAverage(this.filterOnMonth(r, x.id), ['NIGHT']))
                    : undefined
            ].filter(x => x !== undefined).map(x => x!))
        );
    }

    private setTimelineChartOption() {
        this.optionTimelineChart = defineTimelineChartOption(
            this.locations.map(x => [
                ['ALL', 'DAWN'].includes(this.shiftTimeline) ? `Manhã (${x})` : undefined,
                ['ALL', 'MORNING'].includes(this.shiftTimeline) ? `Tarde (${x})` : undefined,
                ['ALL', 'NIGHT'].includes(this.shiftTimeline) ? `Noite (${x})` : undefined
            ].filter(x => x !== undefined).map(x => x!)),
            this.evaluateResult.map(v => [
                ['ALL', 'DAWN'].includes(this.shiftTimeline) ? this.filterOnShift(v, ['DAWN']) : undefined,
                ['ALL', 'MORNING'].includes(this.shiftTimeline) ? this.filterOnShift(v, ['MORNING']) : undefined,
                ['ALL', 'NIGHT'].includes(this.shiftTimeline) ? this.filterOnShift(v, ['NIGHT']) : undefined
            ].filter(x => x !== undefined).map(x => x!))
        );
    }

    private setSummaryBarChartOption() {

        if (this.monthBarSelect !== 0) {
            this.optionSummaryBarChart = defineSummaryBarChartOption(
                ['Score Médio', 'Score Médio Manhã', 'Score Médio Tarde', 'Score Médio Noite'],
                this.locations,
                this.evaluateResult.map(v => [
                    this.calcAverageOnMonth(v, this.monthBarSelect,['DAWN', 'MORNING', 'NIGHT']),
                    this.calcAverageOnMonth(v, this.monthBarSelect,['DAWN']),
                    this.calcAverageOnMonth(v, this.monthBarSelect,['MORNING']),
                    this.calcAverageOnMonth(v, this.monthBarSelect,['NIGHT']),
                ])
            );
            return;
        }

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
}
