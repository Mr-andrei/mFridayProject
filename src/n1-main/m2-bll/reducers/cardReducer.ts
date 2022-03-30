import {Dispatch} from 'redux'
import {setErrorN, setLoaderStatus} from './appReducer';
import {handleError} from '../../m1-ui/utilities/handleError';
import {
    cardsAPI,
    CardsDataType,
    CardType,
    RequestForCardsType,
    RequestToAddCardType,
    RequestToUpdateCardType, RequestToUpdateGradeType
} from '../api/cards-a-p-i';
import {AppRootStateType, AppThunk} from '../store';


export const initialCardForReducer: CardType = {
    answer: 'no answer',
    cardsPack_id: 'noneInInitialCard',
    comments: 'none',
    created: 'none',
    grade: 0,
    more_id: 'none',
    question: 'no questions',
    rating: 0,
    shots: 0,
    type: 'none',
    updated: 'none',
    user_id: 'none',
    __v: 0,
    _id: 'none',
}
const initialState = {
    data: {
        cards: [
            {
                answer: 'none',
                cardsPack_id: 'none',
                comments: 'none',
                created: 'none',
                grade: 0,
                more_id: 'none',
                question: 'none',
                rating: 0,
                shots: 0,
                type: 'none',
                updated: 'none',
                user_id: 'none',
                __v: 0,
                _id: 'none',
            },
        ],
        cardsTotalCount: 0,
        maxGrade: 0,
        minGrade: 0,
        packUserId: 'none',
        page: 0,
        pageCount: 0,
        token: 'none',
        tokenDeathTime: 0,
    },
    packName: '',
    getData: {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: '',
        minGrade: 0,
        maxGrade: 0,
        sortCards: '',
        page: 0,
        pageCount: 10,
    },
    cardsForLearn: [
        initialCardForReducer,
    ],
    currentCard: initialCardForReducer,
    isGet: false,
}
export const cardsReducer = (state = initialState, action: CardReducerActionsType): InitialStateType => {

    switch (action.type) {
        case 'CARDS_REDUCER/SET_CARDS':
            return {...state, data: action.data, packName: action.packName};
        case 'CARDS_REDUCER/SET_ID_PACKS':
            return {...state, packName: action.name, getData: {...state.getData, cardsPack_id: action.idCards,}};
        case 'CARDS_REDUCER/SET_CURRENT_PAGE':
            return {...state, getData: {...state.getData, page: action.page}};
        case 'CARDS_REDUCER/SET_SORT_VALUE':
            return {...state, getData: {...state.getData, sortCards: action.sortValue}};

        case 'CARDS_REDUCER/SET_CARDS_FOR_LEARN':
            return {
                ...state,
                data: {...state.data, cardsTotalCount: action.countCards},
                cardsForLearn: action.data, packName: action.namePack
            };
        case 'CARDS_REDUCER/SET_CARDS_QUESTION':
            return {...state, getData: {...state.getData, cardQuestion: action.value}};
        case 'CARDS_REDUCER/SET_CURRENT_CARD':
            return {...state, currentCard: action.card};
        case 'CARDS_REDUCER/SET_IS_GET':
            return {...state, isGet: action.isGet};
        default:
            return state;
    }
}
export const setIsGet = (isGet: boolean) => ({type: 'CARDS_REDUCER/SET_IS_GET', isGet} as const);
export const setCurrentCard = (card: CardType) =>
    ({type: 'CARDS_REDUCER/SET_CURRENT_CARD', card} as const);
export const setCardsForLearn = (data: CardType[], countCards: number, namePack: string) =>
    ({type: 'CARDS_REDUCER/SET_CARDS_FOR_LEARN', data, countCards, namePack} as const);
export const setCardsAC = (data: CardsDataType, packName: string) => ({
    type: 'CARDS_REDUCER/SET_CARDS',
    data,
    packName
} as const);
export const setIdCardsAC = (idCards: string, name: string) => ({
    type: 'CARDS_REDUCER/SET_ID_PACKS',
    idCards,
    name
} as const);
export const setCardsCurrentPage = (page: number) => ({type: 'CARDS_REDUCER/SET_CURRENT_PAGE', page} as const);
export const setCardsSortValue = (sortValue: string) => ({type: 'CARDS_REDUCER/SET_SORT_VALUE', sortValue} as const);
export const setCardsQuestion = (value: string) => ({type: 'CARDS_REDUCER/SET_CARDS_QUESTION', value} as const);


//thunks

export const getCardsTC = (): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        const data: RequestForCardsType = getState().cards.getData;
        const namePack = getState().cards.packName;

        try {
            dispatch(setLoaderStatus('loading'));
            const res = await cardsAPI.getCards(data);
            dispatch(setCardsAC(res.data, namePack));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }

    }
export const getCardsForLearn = (idPack: string, namePack: string) =>
    async (dispatch: Dispatch<CardReducerActionsType>) => {
        try {
            dispatch(setLoaderStatus('loading'));
            const res = await cardsAPI.getCards({cardsPack_id: idPack, pageCount: 150});
            if (res.data.cardsTotalCount) {
                dispatch(setCardsForLearn(res.data.cards, res.data.cardsTotalCount, namePack));
            } else
                dispatch(setCardsForLearn([initialCardForReducer], 0, namePack));
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));
        }
    }

export const addNewCardTC = (dataForAdd: RequestToAddCardType): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.addNewCard(dataForAdd);
            dispatch(getCardsTC())
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'));

        }
    }

export const deleteCardTC = (idCard: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.deleteCard(idCard);
            dispatch(getCardsTC())
        } catch (e) {
            handleError(e, dispatch);
        } finally {
            dispatch(setLoaderStatus('idle'))

        }
    }


export const updateCardTC = (dataForUpdate: RequestToUpdateCardType): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.updateCard(dataForUpdate);
            dispatch(getCardsTC())
        } catch (e) {
            handleError(e, dispatch)
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }
export const updateCardGradeTC = (dataForUpdate: RequestToUpdateGradeType): AppThunk =>
    async (dispatch, getState: () => AppRootStateType) => {
        try {
            const cardsForLearn = getState().cards.cardsForLearn;
            dispatch(setLoaderStatus('loading'));
            await cardsAPI.updateGrade(dataForUpdate);
            const cardsWithUpdatedGrade = cardsForLearn.map(x => x._id === dataForUpdate.card_id ? {
                ...x,
                grade: dataForUpdate.grade
            } : x);
            dispatch(setCardsForLearn(cardsWithUpdatedGrade, getState().cards.data.cardsTotalCount, getState().cards.packName));
        } catch (e) {
            handleError(e, dispatch)
        } finally {
            dispatch(setLoaderStatus('idle'))
        }
    }

//types
export type CardReducerActionsType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof setLoaderStatus>
    | ReturnType<typeof setErrorN>
    | ReturnType<typeof setIdCardsAC>
    | ReturnType<typeof setCardsCurrentPage>
    | ReturnType<typeof setCardsSortValue>
    | ReturnType<typeof setCardsForLearn>
    | ReturnType<typeof setCardsQuestion>
    | ReturnType<typeof setCurrentCard>
    | ReturnType<typeof setIsGet>
type InitialStateType = typeof initialState;