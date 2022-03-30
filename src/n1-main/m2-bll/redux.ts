import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useTypedSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

