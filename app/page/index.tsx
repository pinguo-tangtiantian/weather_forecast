import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.css';
import './css/style.css';

import { reducer } from '../reducer/reducer';

import App from '../components/app';


const store: any = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);

/* 
流程：
1. 定义无状态、无业务逻辑的UI组件
2. 定义用户行为action
3. 定义根据不同action处理不同业务逻辑的reducer
4. 定义各类接口
5. 定义store，监听reducer
6. 设置映射关系
7. 通过connet生成容器组件
8. 挂载组件
*/
