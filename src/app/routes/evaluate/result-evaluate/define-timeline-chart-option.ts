import {EChartsOption} from "echarts";
import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";

const defineTimelineChartOption = (
    dawn: EvaluateClientRecordResult[],
    morning: EvaluateClientRecordResult[],
    night: EvaluateClientRecordResult[]
): EChartsOption => {
    return {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {},
        toolbox: {
            feature: {
                restore: {},
            }
        },
        xAxis: {
            type: 'time',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            max: 1
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: 'Manhã',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: dawn.map(x => [+new Date(x.day), x.score.round(2)])
            },
            {
                name: 'Tarde',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: morning.map(x => [+new Date(x.day), x.score.round(2)])
            },
            {
                name: 'Noite',
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: night.map(x => [+new Date(x.day), x.score.round(2)])
            }
        ]
    };
}

export default defineTimelineChartOption;