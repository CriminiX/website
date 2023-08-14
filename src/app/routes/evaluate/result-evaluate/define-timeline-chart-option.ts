import {EChartsOption} from "echarts";
import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";

const defineTimelineChartOption = (
    labels: string[][],
    data: EvaluateClientRecordResult[][][]
): EChartsOption => {
    return {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {

        },
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
            max: 1000
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
        series: data.flatMap((value, indexA) => value.map((x, indexB) => {
            return {
                name: labels[indexA][indexB],
                type: 'line',
                smooth: true,
                symbol: 'none',
                areaStyle: {},
                data: x.map(x => [+new Date(x.day), x.score.round(0)])
            }
        }))
    };
}

export default defineTimelineChartOption;