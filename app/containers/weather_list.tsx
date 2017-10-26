import { connect } from 'react-redux';
import { WeatherListView } from '../components/weather_list_view';

import { AppState, AppAction } from '../interfaces/interfaces';

function mapStateToProps(state: AppState){
    return {
        weatherInfo: state.weatherInfo,
        success: state.success,
        searchCurrentFlag: state.searchCurrentFlag,
        isFetching: state.isFetching
    }
}


export const WeatherList = connect(
    mapStateToProps
)(WeatherListView); 