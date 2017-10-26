import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

import { SearchBarView } from '../components/search_bar_view';
import { AppState, AppAction } from '../interfaces/interfaces';

const ROOT_URL = `https://bird.ioliu.cn/weather`;

function mapStateToProps(state: AppState){
    return {
        cityName: state.cityName,
        provinces: state.provinces,
        selectProvince: state.selectProvince,
        selectCity: state.selectCity
    }
}

function mapDispatchToProps(dispatch: any){

//如果传递的是一个函数，该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起（提示：你也许会用到 Redux 的辅助函数 bindActionCreators()
    return {
        onCityNameChange: ()=>dispatch({ type: "CITY_INPUT_CHANGE"}),
        onProvinceChange: ()=>dispatch({ type: "PROVINCE_CHANGE" }),
        onCityChange: ()=>dispatch({ type: "CITY_CHANGE" }),
        onCurrentClick: ()=>dispatch(fetchData(ROOT_URL, { type: "SEARCH_CURRENT" })),
        onFutureClick: ()=>dispatch(fetchData(ROOT_URL, { type: "SEARCH_FUTURE" })),
    }
}
//如果传递的是一个对象，那么每个定义在该对象的函数都将被当作 Redux action creator，而且这个对象会与 Redux store 绑定在一起，其中所定义的方法名将作为属性名，合并到组件的 props 中



export const SearchBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBarView);