import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";

const defineRadarChartOption = (labels: string[], data: number[]): EChartsOption => {
    return {
        radar: {
            indicator: labels.map(x => {
                return {
                    name: x,
                    max: 1
                }
            })
        },
        series: [
            {
                label: {
                    show: true,
                    formatter: (params: any) => params.value.toFixed(2),
                    fontSize: '10px'
                },
                type: "radar",
                data: [
                    {
                        value: data,
                    },
                ],
            },
        ],
    };
}

export default defineRadarChartOption;