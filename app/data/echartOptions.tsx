import { colors } from './weather_color';

export function futureChartOption(weatherInfo: any) {
    const dailyData: any[] = weatherInfo.daily;
    const date: string[] = dailyData.map(oneday => oneday.date);
    const tempHigh: string[] = dailyData.map(oneday => oneday.day.temphigh);
    const tempLow: string[] = dailyData.map(oneday => oneday.night.templow);
    const echartOption: any = {
        title: {
            text: "未来一周气温走势图"
        },
        grid: {
            show: true,
            left: "25%"
        },
        legend: {
            data: ["最高气温", "最低气温"]
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: [
            {
                type: "category",
                data: date,
                boundaryGap: true,
                axisTick: {
                    alignWithLabel: true,
                    interval: 0
                }
            }
        ],
        yAxis: [
            {
                type: "value"
            },
            {
                type: "value"
            }
        ],
        toolbox: {
            left: 'center',
            feature: {
                saveAsImage: {}
            }
        },
        series: [
            {
                name: "最高气温",
                type: 'line',
                data: tempHigh,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{c} ℃'
                    }
                }
            },
            {
                name: "最低气温",
                type: 'line',
                data: tempLow,
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        formatter: '{c} ℃'
                    }
                }
            }
        ],
        visualMap: {
            pieces: colors,
            outOfRange: {
                color: '#999'
            }
        },
    };

    return echartOption;
}

export function currentChartOption(weatherInfo: any) {
    let hourData: any[] = weatherInfo.hourly;
    let temp: string[] = hourData.map(hour => hour.temp);
    let hour: string[] = hourData.map(hour => hour.time);
    const echartOption: any = {
        title: {
            text: "今日气温走势图"
        },
        grid: {
            show: true,
            left: "25%"
        },
        tooltip: {
            trigger: 'axis'
        },
        dataZoom: [
            {
                startValue: hour[0]
            }
        ],
        xAxis: [
            {
                type: "category",
                data: hour,
                boundaryGap: true,
                axisTick: {
                    alignWithLabel: true,
                    interval: 0
                }
            }
        ],
        yAxis: {
            type: "value"
        },
        toolbox: {
            left: 'center',
            feature: {
                saveAsImage: {}
            }
        },
        series: [{
            type: 'line',
            data: temp,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c} ℃'
                },
            }
        }],
        visualMap: {
            pieces: colors,
            outOfRange: {
                color: '#999'
            }
        },
    };

    return echartOption;
}