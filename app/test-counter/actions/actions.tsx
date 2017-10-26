interface IAppAction{
    type: string
}

//定义action
export const increaseAction: IAppAction = { type: "INCREASE" };