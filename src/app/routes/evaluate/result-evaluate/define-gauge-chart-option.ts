import {EChartsOption} from "echarts";

const defineGaugeChartOption = (labels: string[], data: number[]): EChartsOption => {
    return {
        series: {
            type: "gauge",
            center: ['50%', '50%'],
            startAngle: 180,
            endAngle: 0,
            radius: '90%',
            max: 1000,
            pointer: {
                show: false,
            },
            tooltip: {},
            axisLine: {
                lineStyle: {
                    width: 15 * data.length
                },
                roundCap: true
            },
            progress: {
                show: true,
                overlap: false,
                clip: false,
                roundCap: true,
                itemStyle: {
                    borderWidth: 1,
                    borderColor: '#232323'
                }
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                distance: 15 + (15 * data.length),
            },
            detail: {
                width: 50,
                height: 14,
                fontSize: 12,
                color: "#fff",
                borderColor: "inherit",
                backgroundColor: "inherit",
                borderRadius: 5,
                borderWidth: 1,
            },
            title: {
                fontSize: 10
            },
            data: data.map((x,  index) => {

                let w = 0;
                let h = 0;

                if (data.length > 1) {
                    w = (((160 / (data.length - 1)) * index) - 80).round(1);
                    h = 30;
                }

                return {
                    value: x.round(0),
                    name: labels[index],
                    detail: {
                        offsetCenter: [`${w}%`, `${h}%`]
                    },
                    title: {
                        offsetCenter: [`${w}%`, `${h + 20}%`]
                    }
                }
            })
        },
    }
}

export default defineGaugeChartOption;