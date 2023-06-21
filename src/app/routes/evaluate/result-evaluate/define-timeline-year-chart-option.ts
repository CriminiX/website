import {EChartsOption} from "echarts";
import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";

const defineTimelineYearChartOption = (
    axis: string[],
    labels: string[],
    data: number[][],
): EChartsOption => {
    return {
        tooltip: {},
        legend: {
            data: labels
        },
        xAxis: {
            type: 'category',
            data: axis
        },
        yAxis: {
            type: 'value',
            max: 1
        },
        series: data.map((value, index) => {
            return {
                data: value.map(x => x.round(2)),
                type: 'line',
                name: labels[index]
            }
        })
    };
}

export default defineTimelineYearChartOption;