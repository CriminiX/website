import {EChartsOption} from "echarts";

const definePictorialSummaryChartOption = (label: string, data: number): EChartsOption => {
    return {
        tooltip: {
        },
        grid: {
        },
        yAxis: {
            data: [label],
            inverse: true,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                margin: 30,
                fontSize: 14
            },
            show: false
        },
        xAxis: {
            max: 1000,
            min: 0,
            splitLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            axisLine: { show: false }
        },
        animationDurationUpdate: 500,
        series: [
            {
                // current data
                type: 'pictorialBar',
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbolClip: true,
                symbol: 'box',
                symbolSize: 30,
                symbolBoundingData: 1000,
                data: [data.round(0)],
                z: 10
            },
            {
                // full data
                type: 'pictorialBar',
                itemStyle: {
                    opacity: 0.2
                },
                label: {
                    show: true,
                    opacity: 1,
                    position: 'bottom',
                    offset: [0, -50],
                    fontSize: 18
                },
                color: 'gray',
                animationDuration: 0,
                symbol: 'box',
                symbolRepeat: 'fixed',
                symbolMargin: '5%',
                symbolSize: 30,
                symbolBoundingData: 1000,
                data: [data.round(0)],
                z: 5
            }
        ]
    };
}

export default definePictorialSummaryChartOption;