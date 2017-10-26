import * as React from 'react';


interface SelecetProps{
    cityName: string,
    provinces: any,
    selectProvince: string,
    selectCity: string,

    onCityNameChange: any,
    onProvinceChange: any,
    onCityChange: any,
    onCurrentClick: any,
    onFutureClick: any
};
interface SelecetState{};


/**
 * 渲染所有省份
 * @param provinces 省市数据
 */
function renderProvinces(provinces: any): JSX.Element{
    return (
        provinces.map(province => {
            return (
                <option value={province.provinceName} key={province.provinceName}>
                    {province.provinceName}
                </option>
            );
        })
    )
}


/**
 * 渲染选定省份对应的城市
 * @param provinces 省市数据
 * @param selectProvince 已选定省份
 */
function renderCities(provinces: any, selectProvince: string): JSX.Element{
    let cities: any = [];
    provinces.map(province =>{
        if(province.provinceName == selectProvince){
            cities = province.cities;
        }
    });

    return cities.map(city => {
        return (
            <option value={city.cityName} key={city.cityName}>
                {city.cityName}
            </option>
        );
    })
}

export class SearchBarView extends React.Component<SelecetProps, SelecetState>{
    constructor(props: SelecetProps){
        super(props);
    }

    render(): JSX.Element{
        const {
            cityName,
            provinces,
            selectProvince,
            selectCity,
            onCityNameChange,
            onCurrentClick,
            onFutureClick,
            onProvinceChange,
            onCityChange
        } = this.props;

        return (
            <form className="weather-form" role="form">
                <div className="row">
                    <label className="col-md-2 col-sm-3">请输入城市名称：</label>
                    <div className="form-group col-md-2  col-sm-2">
                        <input
                        type="text"
                        placeholder="请输入要查询的城市的拼音，如：chengdu"
                        id="input"
                        value={cityName}
                        onChange={onCityNameChange}
                        className="form-control"/>
                    </div>

                    <label className="col-md-2 col-sm-3">或者选择城市：</label>
                    <div className="form-group col-md-2 col-sm-2">
                        <input type="text" value="中国" className="form-control country" readOnly />
                    </div>

                    <div className="form-group col-md-2 col-sm-2">
                        <select className="form-control province" id="province"  value={selectProvince} onChange={onProvinceChange}>
                            {
                                renderProvinces(provinces)
                            }
                        </select>
                    </div>
                    <div className="form-group col-md-2 col-sm-2">
                        <select className="form-control city" id="city" value={selectCity} onChange={onCityChange}>
                            {
                                renderCities(provinces, selectProvince)
                            }
                        </select>
                    </div>
                </div>
                <p>
                    <input type="button" className="btn btn-primary current-btn" onClick={onCurrentClick} value="查询今日天气" />
                    <input type="button" className="btn btn-primary future-btn" onClick={onFutureClick} value="查询未来一周天气" />
                </p>
            </form>
        )
    }
}