import * as React from 'react';

interface ICounterProps{
    value: number,
    onIncreaseClick: any
};

interface ICounterState{};


//定义组件
export default class Counter extends React.Component<ICounterProps, ICounterState>{
    constructor(props: ICounterProps){
        super(props);
    }

    render(): JSX.Element {
        const { value, onIncreaseClick }: any = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>增加</button>
            </div>
        )
    }
}