import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";

const defineRadarChartOption = (axis: string[], labels: string[], data: number[][]): EChartsOption => {
    return {
        radar: {
            center: ['50%', '50%'],
            indicator: axis.map(x => {
                return {
                    name: x,
                    max: 1000
                }
            })
        },
        tooltip: {},
        legend: {
            data: labels
        },
        series: [
            {
                label: {
                    show: true,
                    formatter: (params: any) => params.value.toFixed(0),
                    fontSize: '10px'
                },
                areaStyle: {},
                type: "radar",
                data: data.map((value, index) => {
                    return {
                        value: value.map(x => x.round(0)),
                        name: labels[index]
                    }
                })
            },
        ],
    };
}

export default defineRadarChartOption;