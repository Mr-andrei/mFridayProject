import axios, {AxiosResponse} from 'axios';


const instance = axios.create({
    //baseURL: "http://localhost:7542/2.0/",
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

export const cardsAPI = {
    getCards(data: RequestForCardsType) {
        return instance.get<RequestForCardsType,AxiosResponse<CardsDataType>>
        (`/cards/card/`, {
                params: data,
            }
        )
    },
    addNewCard(data: RequestToAddCardType) {
        return instance.post<RequestToAddCardType>('/cards/card', data)
    },
    deleteCard(id: string) {
        return instance.delete(`/cards/card?id=${id}`)
    },
    updateCard(data: RequestToUpdateCardType) {
        return instance.put<RequestToUpdateCardType>(`/cards/card`, data);
    },
    updateGrade(data: RequestToUpdateGradeType) {
        return instance.put<RequestToUpdateGradeType,AxiosResponse<ResponseUpdateGrade>>
        ('cards/grade', data);
    }
};
//types
export type ResponseUpdateGrade={
    updatedGrade:{
        _id:string;
        cardsPack_id:string;
        card_id:string;
        user_id:string;
        grade:number;
        shots:number;
    }
}
export type RequestToUpdateGradeType = {
    grade: number;
    card_id: string;
}
export type RequestToUpdateCardType = {
    card: {
        _id: string;
        question?: string;
        answer?: string
    }
}
export type RequestToAddCardType = {
    card: {
        cardsPack_id: string;
        question: string|undefined;
        answer: string|undefined;
        grade?: number;
        shots?: number;
        answerImg?: string;
        questionImg?: string;
        questionVideo?: string;
        answerVideo?: string;
    }
}
export type RequestForCardsType = {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id: string;
    minGrade?: number;
    maxGrade?: number;
    sortCards?: string;
    page?: number;
    pageCount?: number;
}

/*export type DataGetType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
}*/

export type UpdatedType =
    '0updated'
    | '1updated'
    | '0cardsCount'
    | '1cardsCount'
    | '0packName'
    | '1packName'
    | '0grade'
    | '1grade'
    | '1created'
    | '0created'

export type CardsDataType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string;
    //custom property for rendering table of cards
    actions?:string;
}