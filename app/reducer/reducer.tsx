import axios from 'axios';
import { combineReducers } from 'redux';

import { AppState, AppAction } from '../interfaces/interfaces';
import * as data from '../data/cities.js';
import { Common } from '../page/js/common';

export const initState: AppState = {
    cityName: "北京市",
    weatherInfo: {},
    isFetching: false,
    error: false,
    success: false,
    provinces: data.provinces,
    selectProvince: "北京市",
    selectCity: "北京市",
    searchCurrentFlag: 0
}



//reducer中更新state
export function reducer(state: AppState = initState, action: AppAction): AppState {
    let newDataInfo: any = {};
    switch (action.type) {
        case "REQUEST_DATA":
            return Object.assign({}, state, {
                isFetching: true,
            });
        case "RECEIVE_DATA":
            return Object.assign({}, state, {
                isFetching: false,
                success: true,
                weatherInfo: action.data
            });
        case "RECEIVE_ERROR":
            return Object.assign({}, state, {
                isFetching: false,
                success: false,
                error: true,
                weatherInfo: action.data
            });
        case "CITY_INPUT_CHANGE": {
            const inputDom: HTMLInputElement = document.querySelector("#input") as HTMLInputElement;
            const checkInfo: any = Common.inputChangeSelect(inputDom.value);
            if(checkInfo.found){
                return Object.assign({}, state, {
                    cityName: inputDom.value,
                    selectProvince: checkInfo.province,
                    selectCity: checkInfo.city
                });
            }else{
                return Object.assign({}, state, {
                    cityName: inputDom.value
                });
            }
        }
        case "PROVINCE_CHANGE": {
            const provinceDom: HTMLSelectElement = document.querySelector("#province") as HTMLSelectElement;
            let city: string = "";
            state.provinces.map(province=>{
                if(province.provinceName == provinceDom.value){
                    city = province.cities[0].cityName;
                }
            })
            return Object.assign({}, state, {
                selectProvince: provinceDom.value,
                cityName: city
            });
        }
        case "CITY_CHANGE": {
            const cityDom: HTMLSelectElement = document.querySelector("#city") as HTMLSelectElement;
            return Object.assign({}, state, {
                cityName: cityDom.value,
                selectCity: cityDom.value
            });
        }
        case "SEARCH_CURRENT": {
            return Object.assign({}, state, {
                searchCurrentFlag: 1
            });
        }
        case "SEARCH_FUTURE": {
            return Object.assign({}, state, {
                searchCurrentFlag: -1
            });
        }
        default:
            return state;
    }
}

//ps:
//1. 定义reducer时设置state的初始值
//2. reducer处理时定义默认情况的返回
