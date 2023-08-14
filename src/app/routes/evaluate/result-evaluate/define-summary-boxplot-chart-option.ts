import * as stat from "simple-statistics";
import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";

const defineSummaryBoxplotChartOption = (axis: string[], labels: string[], data: EvaluateClientRecordResult[][][]): EChartsOption => {

    const summaryData = (data: EvaluateClientRecordResult[][]) => {
        return data.map(x => {
            const score = x.map(x => x.score);

            const min = stat.min(score);
            const q1 = stat.quantile(score, 0.25);
            const median = stat.median(score);
            const q3 = stat.quantile(score, 0.75);
            const max = stat.max(score);

            return [min, q1, median, q3, max].map(x => x.round(0));
        });
    }

    return {
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        xAxis: {
            type: 'category',
            data: axis,
        },
        yAxis: {
            type: 'value',
            max: 1000,
            min: 0
        },
        series: data.map((value, index) => {
            return {
                name: labels[index],
                type: 'boxplot',
                data: summaryData(value)
            }
        })
    };
}

export default defineSummaryBoxplotChartOption;