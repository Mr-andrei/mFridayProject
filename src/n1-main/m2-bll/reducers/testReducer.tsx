import {pingAPI, ResponsePingType} from '../api/api';
import {Dispatch} from 'redux';

const initialState = {
    data: {} as ResponsePingType,
}

export const testReducer = (state = initialState, action: TestReducerActionType): StateTestReducerType => {
    switch (action.type) {
        case 'TEST_REDUCER/GET_PING':
            return {...state, data: action.data}
        default:
            return state;
    }
}
export const getPing = (data: ResponsePingType) => ({type: 'TEST_REDUCER/GET_PING', data} as const);

export const getPingT = () =>
    async (dispatch: Dispatch<TestReducerActionType>) => {
        try {
            const res = await pingAPI.getPing();
            dispatch(getPing(res.data));
        } catch (e: any) {
            alert(e.message)
        }

    }
export type StateTestReducerType = typeof initialState;
export type TestReducerActionType =
    ReturnType<typeof getPing>