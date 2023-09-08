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
        grid: {
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: axis,
            axisLabel: {
                interval: 0,
                rotate: 30
            }
        },
        yAxis: {
            type: 'value',
            max: 1000
        },
        series: data.map((value, index) => {
            return {
                data: value.map(x => x.round(0)),
                type: 'line',
                name: labels[index]
            }
        })
    };
}

export default defineTimelineYearChartOption;