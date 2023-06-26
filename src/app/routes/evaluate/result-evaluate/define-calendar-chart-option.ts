import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";
import {format, parse} from "date-fns";

const defineCalendarChartOption = (monthName: string, month: number, data: EvaluateClientRecordResult[]): EChartsOption => {
    const year = new Date().getFullYear();
    const monthCalendar = format(new Date(year, month - 1), "yyyy-MM");

    return {
        tooltip: {
            formatter: (params: any) => format(parse(params.value[0], 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy')
                + ': ' + (1000 - params.value[1]).toFixed(0)
        },
        visualMap: {
            show: false,
            min: 0,
            max: 1000,
            calculable: true,
            bottom: 20,
            // inRange: {
            //     color: ['#FF5836', '#FFC3B7']
            // },
            controller: {
                inRange: {
                    opacity: 0.5
                }
            }
        },
        calendar: {
            left: 'center',
            top: 'middle',
            width: '75%',
            height: '75%',
            yearLabel: {
                show: false
            },
            orient: 'vertical',
            dayLabel: {
                nameMap: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
            },
            monthLabel: {
                show: false
            },
            range: monthCalendar
        },
        series: [
            {
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 0,
                name: monthName,
                label: {
                    show: true,
                    formatter: function (params) {
                        // @ts-ignore
                        const day: string = params.value[0];
                        const d = parse(day, "yyyy-MM-dd", new Date());
                        // @ts-ignore
                        return `${d.getDate()}\n\n${params.value[1].toFixed(0)}`;
                    },
                    color: '#000'
                },
                data: data.map((x) => [x.day, x.score.round(0)]),
                silent: true
            },
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                name: monthName,
                data: data.map((x) => [x.day, 1000 - x.score])
            }
        ]
    };
}

export default defineCalendarChartOption;