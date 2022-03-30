import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {authReducer} from './reducers/authReducer';
import {testReducer} from './reducers/testReducer';
import {appReducer} from './reducers/appReducer';

import {packsReducer, PacksReducerActionType} from './reducers/packsReducer';

import {CardReducerActionsType, cardsReducer} from './reducers/cardReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    test: testReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk <ReturnTye = void> = ThunkAction<void,AppRootStateType,unknown,CardReducerActionsType | PacksReducerActionType >
//@ts-ignore
window.store = store;