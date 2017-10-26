import * as React from 'react';
import { render } from 'react-dom';

import * as echarts from 'echarts';

import { currentChartOption, futureChartOption } from '../data/echartOptions';
interface WeatherProps {
    weatherInfo: any,
    success: boolean,
    searchCurrentFlag: number,
    isFetching: boolean
};
interface WeatherState { };

/**
 * 渲染当日天气信息
 * @param weatherInfo 天气信息
 */
function renderCurrentWeather(weatherInfo: any): JSX.Element {
    return (
        <div className="weather_info">
            <div id='current_echart' className="charts" style={{ "width": "100%", "minWidth": "450px", "height": "500px" }}></div>

            <div>{weatherInfo.city} {weatherInfo.date} 天气情况</div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="col-md-2 col-sm-3">城市天气信息</th>
                        <th className="col-md-2 col-sm-3">各项指数信息</th>
                        <th className="col-md-2 col-sm-3">空气质量指数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center">
                            <small>数据更新于：{weatherInfo.updatetime}</small>
                            <h4>当前城市：{weatherInfo.city}</h4>
                            <p>天气：{weatherInfo.weather}</p>
                            <p>温度：{weatherInfo.temp}&#8451;</p>
                            <p>最高气温：{weatherInfo.temphigh}&#8451;</p>
                            <p>最低气温：{weatherInfo.templow}&#8451;</p>
                            <p>风力：{weatherInfo.windpower}</p>
                            <p>湿度：{weatherInfo.humidity}</p>
                        </td>
                        <td>
                            {
                                weatherInfo.index.map((item, index) => {
                                    return (
                                        <p key={"item"+index}>{item.iname}:{item.ivalue}</p>
                                    )
                                })
                            }
                        </td>
                        <td>
                            <p>空气质量：{weatherInfo.aqi.quality}</p>
                            <p>空气影响：{weatherInfo.aqi.aqiinfo.affect}</p>
                            <p>出行建议：{weatherInfo.aqi.aqiinfo.measure}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

/**
 * 绘制当日24小时温度走势图
 * @param weatherInfo 
 */
function drawChartHourly(weatherInfo: any) {
    const Echart: HTMLDivElement = document.getElementById("current_echart") as HTMLDivElement;
    let myChart = echarts.init(Echart);

    myChart.clear();
    myChart.setOption(currentChartOption(weatherInfo));
    return Echart;
}

/**
 * 渲染未来一周天气
 * @param weatherInfo 天气信息
 */
function renderFutureWeather(weatherInfo: any): JSX.Element {
    return (
        <div className="weather_info">
            <div id='future_echart' style={{ "width": "100%", "minMidth": "500px", "height": "450px" }}></div>
            <div>{weatherInfo.city} 从{weatherInfo.date} 起未来一周天气情况</div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>时间</th>
                        {
                            weatherInfo.daily.map(oneday => {
                                return (
                                    <th key={oneday.date}>{oneday.date}/{oneday.week}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>白天</td>
                        {
                            weatherInfo.daily.map((oneday,index) => {
                                return (
                                    <td key={"day" + index}>
                                        <p>天气：{oneday.day.weather}</p>
                                        <p>最高气温：{oneday.day.temphigh}&#8451;</p>
                                        <p>风向：{oneday.day.winddirect}</p>
                                        <p>风力：{oneday.day.windpower}</p>
                                    </td>
                                )
                            })
                        }
                    </tr>
                    <tr>
                        <td>夜晚</td>
                        {
                            weatherInfo.daily.map((oneday, index) => {
                                return (
                                    <td key={"night"+index}>
                                        <p>天气：{oneday.night.weather}</p>
                                        <p>最低气温：{oneday.day.templow}&#8451;</p>
                                        <p>风向：{oneday.day.winddirect}</p>
                                        <p>风力：{oneday.day.windpower}</p>
                                    </td>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

/**
 * 绘制未来一周温度走势图
 * @param weatherInfo 
 */
function drawChartDaily(weatherInfo: any){
    const Echart: HTMLDivElement = document.getElementById("future_echart") as HTMLDivElement;
    let myChart = echarts.init(Echart);

    myChart.clear();
    myChart.setOption(futureChartOption(weatherInfo));
    return Echart;
}



export class WeatherListView extends React.Component<WeatherProps, WeatherState>{
    currentEchartDOM: HTMLDivElement;
    futureEchartDOM: HTMLDivElement;

    constructor(props: WeatherProps) {
        super(props);
    }

    componentWillUpdate() {
        if(this.currentEchartDOM){
            this.currentEchartDOM.style.display = "none";
        }
        if(this.futureEchartDOM){
            this.futureEchartDOM.style.display = "none";
        }
    }

    componentDidUpdate() {
        if(this.props.success && !this.props.isFetching){
            if(this.props.searchCurrentFlag == 1) {
                this.currentEchartDOM = drawChartHourly(this.props.weatherInfo);
                this.currentEchartDOM.style.display = "block";
            }else if(this.props.searchCurrentFlag == -1){
                this.futureEchartDOM = drawChartDaily(this.props.weatherInfo);
                this.futureEchartDOM.style.display = "block";
            }
        }
    }

    render(): JSX.Element {
        const { weatherInfo, success, searchCurrentFlag } = this.props;
        if (success && searchCurrentFlag != 0) {
            if (searchCurrentFlag == 1)
                return renderCurrentWeather(weatherInfo);
            else if(searchCurrentFlag == -1)
                return renderFutureWeather(weatherInfo);
        } else {
            return <p>{weatherInfo.msg}</p>;
        }
    }
}

