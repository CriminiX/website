import {EChartsOption} from "echarts";

const defineSelectChartOption = (data: number): EChartsOption => {
    return {
        series: {
            type: "gauge",
            center: ['50%', '75%'],
            startAngle: 180,
            endAngle: 0,
            radius: '90%',
            max: 1,
            pointer: {
                show: false,
            },
            progress: {
                show: true,
                overlap: false,
                clip: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
            },
            detail: {
                offsetCenter: [0, '-15%'],
                width: 50,
                height: 14,
                fontSize: 14,
                color: "inherit",
                borderColor: "inherit",
                borderRadius: 20,
                borderWidth: 1,
            },
            data: [
                {
                    value: data.round(2)
                },
            ],
        },
    }
}

export default defineSelectChartOption;