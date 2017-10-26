import axios from 'axios';

import { AppAction } from '../interfaces/interfaces';
import { Common } from '../page/js/common';


function requestData(): AppAction{
    return { type: 'REQUEST_DATA' };
}

function receiveData(json: any): AppAction{
    return {
        type: 'RECEIVE_DATA',
        data: json
    };
}

function receiveError(json: any): AppAction{
    return {
        type: 'RECEIVE_ERROR',
        data: json
    };
}

export function fetchData(rootUrl: string, fetchType: AppAction){
    return function(dispatch: any, getState: any){
        const cityName: string = getState().cityName;
        const len: number = cityName.length;
        const regExp: RegExp = /^[\u4E00-\u9FA5]+$/;
        if(!regExp.test(cityName)){
            alert("输入错误，请重新输入城市的【中文名】。");
        }else{
            const url: string = `${rootUrl}?city=${cityName}`;
            //先发出一个 requestData()，表示操作开始
            dispatch(requestData());
            return axios.get(url)
                .then(function(res: any){
                    //异步操作成功
                    if(res.data.status == "0"){
                        dispatch(receiveData(res.data.result));
                        dispatch(fetchType);
                    }else{
                        dispatch(receiveError(res.data));
                    }
                })
                .catch(function(res: any){
                    //异步操作失败
                    dispatch(receiveError(res.data.msg));
                });
        }
    }
}

export const CITY_CHANGE: AppAction = { type: "CITY_CHANGE" }


//fetchData是一个action creator

/**
 * （1）fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。
 * （2）返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。
 * （5）这样就可在异步结束后再dispatch
 */

 /**
  * 但是普通的dispatch只能接受一个action对象，不可以接收函数
  * 因此需要引入中间件  redux-chunk
  */

//异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch。