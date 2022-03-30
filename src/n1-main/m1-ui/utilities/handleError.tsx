import {Dispatch} from 'redux';
import { setErrorN} from '../../m2-bll/reducers/appReducer';
import {CardReducerActionsType} from "../../m2-bll/reducers/cardReducer";
import {PacksReducerActionType} from '../../m2-bll/reducers/packsReducer';


export const handleError = (e: any, dispatch: Dispatch<CardReducerActionsType & PacksReducerActionType>) => {
    const error = e.response ? e.response.data.error : e.message;
    dispatch(setErrorN(error));
}