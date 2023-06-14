import {EChartsOption} from "echarts";
import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";

const defineTimelineYearChartOption = (
    months: string[],
    total: number[],
    dawn: number[],
    morning: number[],
    night: number[]
): EChartsOption => {
    return {
        tooltip: {},
        legend: {
            data: ['Score Médio', 'Score Médio Manhã', 'Score Médio Tarde', 'Score Médio Noite']
        },
        xAxis: {
            type: 'category',
            data: months
        },
        yAxis: {
            type: 'value',
            max: 1
        },
        series: [
            {
                data: total.map(x => x.round(2)),
                type: 'line',
                name: 'Score Médio'
            },
            {
                data: dawn.map(x => x.round(2)),
                type: 'line',
                name: 'Score Médio Manhã'
            },
            {
                data: morning.map(x => x.round(2)),
                type: 'line',
                name: 'Score Médio Tarde'
            },
            {
                data: night.map(x => x.round(2)),
                type: 'line',
                name: 'Score Médio Noite'
            }
        ]
    };
}

export default defineTimelineYearChartOption;