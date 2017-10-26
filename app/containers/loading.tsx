import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

import LoadingView from '../components/loading_view';
import { AppState, AppAction } from '../interfaces/interfaces';

function mapStateToProps(state: AppState){
    return {
        isFetching: state.isFetching
    }
}

export const Loading = connect(
    mapStateToProps
)(LoadingView);