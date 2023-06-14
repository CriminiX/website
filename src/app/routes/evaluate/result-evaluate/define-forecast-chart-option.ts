import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";

const defineForecastChartOption = (
    dataDawn: EvaluateClientRecordResult[],
    dataMorning: EvaluateClientRecordResult[],
    dataNight: EvaluateClientRecordResult[]
): EChartsOption => {
    return {
        tooltip: {
            formatter: (params: any) => `${params.name} (${params.seriesName}): ${params.value.toFixed(2)}`
        },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: dataDawn.map((x) => x.day),
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: dataDawn.map((x) => x.score),
                type: "line",
                name: 'Manhã',
                areaStyle: {}
            },
            {
                data: dataMorning.map((x) => x.score),
                type: "line",
                name: "Tarde",
                areaStyle: {}
            },
            {
                data: dataNight.map((x) => x.score),
                type: "line",
                name: 'Noite',
                areaStyle: {}
            },
        ],
    };
}

export default defineForecastChartOption;