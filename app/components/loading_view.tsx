import * as React from 'react';
// import * as PropTypes from 'prop-types';

interface LoadingProps{
    isFetching: boolean
};
interface LoadingState{};
export default class LoadingView extends React.Component<LoadingProps, LoadingState>{
    constructor(props: LoadingProps){
        super(props);
    }

    /* static contextTypes: React.ValidationMap<any> = {
        store: PropTypes.object.isRequired
    }

    componentWillMount(){
        this.context.store.subscribe(()=>{
            this.forceUpdate();
        });
    } */

    render (): JSX.Element {
        /* const { store } = this.context;
        const state = store.getState();
        const { isFetching } = state; */

        const { isFetching } = this.props;
        return (
            <div className="loading-view" style={{"display":`${isFetching?"block":"none"}`}} >
                <div className="rect_box">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
                <p>努力加载中，请稍后~</p>
            </div>
        )
    }
}

