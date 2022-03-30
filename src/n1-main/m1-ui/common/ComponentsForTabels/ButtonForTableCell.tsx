import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React from 'react';
import { setIdCardsAC} from '../../../m2-bll/reducers/cardReducer';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';

type PropsType = {
    text: string
    idPack: string
}
export const ButtonForTableCell = ({text, idPack}: PropsType) => {
    const dispatch = useDispatch();
    const showCards = () => {
        dispatch(setIdCardsAC(idPack,text));
    }
    return (
        <>
            <span>{text} </span>
            <NavLink to={`/cards/${idPack}/${text}`}>
                <Button variant="text" onClick={showCards} size={'small'}>
                    <ExitToAppIcon/>
                </Button>
            </NavLink>
        </>
    )
}