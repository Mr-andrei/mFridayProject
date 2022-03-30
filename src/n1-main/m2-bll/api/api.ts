import axios, {AxiosResponse} from 'axios';

export const instance = axios.create({
    //baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});
const urlForPackCards = '/cards/pack';
export const authAPI = {
    login: (data: LoginDataType) => instance.post<LoginDataType, AxiosResponse<UserType>>('/auth/login', data),

    getAuthMe: (payload: {}) => instance.post<UserType>('/auth/me', payload),

    register: (data: Omit<LoginDataType, 'rememberMe'>) =>
        instance.post<Omit<LoginDataType, 'rememberMe'>, AxiosResponse<ResponseRegisterDataType>>('/auth/register', data),

    changeUserName: (data: NewNameUserType) => instance.put<NewNameUserType, AxiosResponse<ResponseUpdateUserType>>('/auth/me', data),

    logOut: () => instance.delete<ResponseCommonType>('/auth/me'),

    postForgotPassword: (data: ForgotPasswordType) => instance.post<ForgotPasswordType, AxiosResponse<ResponseCommonType>>('auth/forgot', data),

    setNewPassword: (data: NewPasswordType) => instance.post<NewPasswordType, AxiosResponse<ResponseCommonType>>('/auth/set-new-password', data),
}

export const packsAPI = {
    getPacks: (data: Partial<RequestPacksType>) =>
        instance.get<Partial<RequestPacksType>, AxiosResponse<ResponsePacksType>>
        (urlForPackCards, {
            params: data,
        }),
    addNewPack: (data: RequestToAddPackType) =>
        instance.post(urlForPackCards, data),

    setPackCards: (data?: Partial<RequestOnePackType>) =>
        instance.post<Partial<RequestOnePackType>, AxiosResponse<{}>>(urlForPackCards, data),
    deletePackCards: (id?: string) => instance.delete<string, AxiosResponse<{}>>(urlForPackCards, {
        params: {
            id,
        }
    }),
    changeNamePackCards: (data: RequestChangeNamePackType) =>
        instance.put<RequestChangeNamePackType, AxiosResponse<{}>>(urlForPackCards, data),
}
export const pingAPI = {
    getPing: () => instance.get<ResponsePingType>('/ping'),
}
//types
//for cardsAPI
export type RequestChangeNamePackType = {
    cardsPack: {
        _id: string;
        name?: string;
        rest?: {}
    }
}
export type RequestOnePackType = {
    cardsPack: {
        name: string;
        deckCover: string;
        private: boolean;
    }
}
export type PackType = {
    _id: string;
    user_id: string;
    name: string;
    cardsCount: number;
    created: string;
    updated: string;
    //custom property for render table packs
    actions?:string;
}
export type ResponsePacksType = {
    cardPacks: PackType[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    searchValue: string;
}
export type RequestPacksType = {
    packName: string;
    min: number;
    max: number;
    sortPacks: string;
    page: number;
    pageCount: number;
    user_id: string;
    searchName?: string;
}
export type ResponsePingType = {
    ping: number;
    backTime: number;
    info: string;
}
export type NewPasswordType = {
    password: string;
    resetPasswordToken: string | undefined;
}
export type ForgotPasswordType = {
    email: string;
    from?: string;
    message: string;
}
export type ResponseCommonType = {
    info: string;
    error: string;
}
export type ResponseUpdateUserType = {
    updatedUser: UserType;
    error?: string;
}
export type NewNameUserType = {
    name?: string;
    avatar: string;
}
export type ResponseRegisterDataType = {
    addedUser: {},
    error?: string;
}
export type LoginDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
}
export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
export type RequestToAddPackType = {
    cardsPack: {name: string}
}