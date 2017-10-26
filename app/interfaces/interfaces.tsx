
export interface AppState{
    cityName: string
    weatherInfo: any,
    isFetching: boolean,
    error: boolean,
    success: boolean,
    provinces: any[],
    selectProvince: string,
    selectCity: string,
    searchCurrentFlag: number
};

export interface AppAction{
    type: string,
    [key: string]: any
};

export interface AppProps{};
