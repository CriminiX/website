import {EChartsOption} from "echarts";

const defineSummaryBarChartOption = (axis: string[], labels: string[], data: number[][]): EChartsOption => {
    return {
        tooltip: {
            // formatter: (params: any) => params.name + ': ' + params.value.toFixed(2),
        },
        legend: {
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
                label: {
                    show: true,
                    // formatter: (params: any) => params.value.toFixed(2),
                },
                name: labels[index],
                type: 'bar'
            }
        })
    };
}

export default defineSummaryBarChartOption;