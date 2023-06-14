import {EvaluateClientRecordResult} from "../../../shared/models/evaluate-client-result";
import {EChartsOption} from "echarts";
import {format, parse} from "date-fns";

const defineCalendarChartOption = (data: EvaluateClientRecordResult[], month: number): EChartsOption => {
    const year = new Date().getFullYear();
    const monthCalendar = format(new Date(year, month - 1), "yyyy-MM");

    return {
        tooltip: {
            formatter: (params: any) => 'Score: ' + params.value[1].toFixed(2)
        },
        visualMap: {
            show: false,
            min: 0,
            max: 1,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: 20,
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
                label: {
                    show: true,
                    formatter: function (params) {
                        // @ts-ignore
                        const day: string = params.value[0];
                        const d = parse(day, "yyyy-MM-dd", new Date());
                        // @ts-ignore
                        return `${d.getDate()}\n\n${params.value[1].toFixed(2)}`;
                    },
                    color: '#000'
                },
                data: data.map((x) => [x.day, x.score]),
                silent: true
            },
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: data.map((x) => [x.day, x.score])
            }
        ]
    };
}

export default defineCalendarChartOption;