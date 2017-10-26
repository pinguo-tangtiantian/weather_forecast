import * as React from 'react';
import { connect } from 'react-redux';

import { SearchBar } from '../containers/search_bar';
import { WeatherList } from '../containers/weather_list';

import { AppProps, AppState, AppAction } from '../interfaces/interfaces';

import { Loading } from '../containers/loading';
// import LoadingView from '../components/loading_view';

export default class App extends React.Component<AppProps, AppState>{
    constructor(props: AppProps){
        super(props);
    }

    render(): JSX.Element {
        return(
            <div className="container wrap">
                <SearchBar />
                <Loading />
                {/* <LoadingView /> */}
                <WeatherList />
            </div>
        )
    }
}