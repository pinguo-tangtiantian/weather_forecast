
interface IAppAction{
    type: string
}
interface IAppState{
    count: number
}

//初始化state
//这个state不属于CounterUI组件
export const initState: IAppState = {
    count: 0
}

//定义reducer
export function reducer(state: IAppState= initState, action: IAppAction){
    let count = state.count;
    switch(action.type){
        case "INCREASE":
            return { count: count+1 };
        default:
            return state;
    }
}