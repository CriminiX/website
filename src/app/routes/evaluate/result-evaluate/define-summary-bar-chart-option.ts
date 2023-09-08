import {EChartsOption} from "echarts";

const defineSummaryBarChartOption = (axis: string[], labels: string[], data: number[][]): EChartsOption => {
    return {
        tooltip: {
            // formatter: (params: any) => params.name + ': ' + params.value.toFixed(2),
        },
        legend: {
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