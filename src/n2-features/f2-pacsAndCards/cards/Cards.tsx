import Grid from '@mui/material/Grid';
import {TableCards} from './tableCards/TableCards';
import {NavLink} from "react-router-dom";
import {setUserID} from "../../../n1-main/m2-bll/reducers/packsReducer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import {useDispatch} from "react-redux";

export const Cards = () => {
    const dispatch = useDispatch()
    return (
        <Grid container sx={{marginTop: 1}}>
            <Grid item xs={12} sx={{minHeight: '70vh'}}>
                <NavLink to={'/packsCards'}
                         style={{textDecoration: 'none'}}
                         onClick={()=>dispatch(setUserID(""))}
                >
                    <ArrowBackIcon
                        style={{color: 'rgb(63, 81, 181)', position: 'relative', top: '40px',left:"70px", marginRight: '5px'}}
                    />
                </NavLink>
                <TableCards/>
            </Grid>
        </Grid>
    );
}