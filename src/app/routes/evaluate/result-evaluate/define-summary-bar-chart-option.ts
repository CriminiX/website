import {EChartsOption} from "echarts";

const defineSummaryBarChartOption = (total: number, dawn: number, morning: number, night: number): EChartsOption => {
    return {
        tooltip: {
            formatter: (params: any) => params.name + ': ' + params.value.toFixed(2),
        },
        xAxis: {
            type: 'category',
            data: ['Score Médio', 'Score Médio Manhã', 'Score Médio Tarde', 'Score Médio Noite']
        },
        yAxis: {
            type: 'value',
            max: 1
        },
        series: [
            {
                data: [total, dawn, morning, night],
                label: {
                    show: true,
                    formatter: (params: any) => params.value.toFixed(2),
                },
                type: 'bar'
            }
        ]
    };
}

export default defineSummaryBarChartOption;