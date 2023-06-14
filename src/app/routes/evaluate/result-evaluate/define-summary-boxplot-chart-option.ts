import * as stat from "simple-statistics";
import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";

const defineSummaryBoxplotChartOption = (data: EvaluateClientRecordResult[][]): EChartsOption => {
    const dataRecords = data.map(x => {
        const score = x.map(x => x.score);

        const min = stat.min(score);
        const q1 = stat.quantile(score, 0.25);
        const median = stat.median(score);
        const q3 = stat.quantile(score, 0.75);
        const max = stat.max(score);

        return [min, q1, median, q3, max].map(x => x.round(2));
    });

    return {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['Score Geral', 'Score Manhã', 'Score Tarde', 'Score Noite'],
        },
        yAxis: {
            type: 'value',
            max: 1,
            min: 0
        },
        series: [
            {
                name: 'Boxplot',
                type: 'boxplot',
                data: dataRecords
            }
        ]
    };
}

export default defineSummaryBoxplotChartOption;