import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, Store, Unsubscribe } from 'redux';
import { Provider, connect } from 'react-redux';

import Counter from './components/counter';
import { initState, reducer} from './reducers/reducer';
import { increaseAction } from './actions/actions';

interface IAppState{
    count: number
}

interface IAppAction{
    type: string
}

//定义store
const store: any = createStore(reducer);

//设置映射关系
function mapStateToProps(state: IAppState){
    /**
     * mapStateToProps: 定义了外部容器组件的state传入内部UI组件的props时的映射关系
     * 如：state.count --> props.value
     */
    return {
        value: state.count
    }
}


function mapDispatchToProps(dispatch){
    /**
     * mapDispatchToProps: 定义了内部UI组件的事件传递至外部容器组件时的映射关系
     * 如：内部组件发生点击“增加按钮”时-->外部组件分发一个行为，这个行为就是增加时对应的行为
     * 在reducer内部定义了这个行为发生时，处理该行为的逻辑
     */
    return {
        onIncreaseClick: ()=>dispatch(increaseAction)
    }
}

//连接组件，生成新的组件
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);
/**
 * Counter是无状态的UI组件，不处理任何业务逻辑
 * App是通过redux自动生成的容器组件，带有业务逻辑和状态
 */

//挂载组件
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
)