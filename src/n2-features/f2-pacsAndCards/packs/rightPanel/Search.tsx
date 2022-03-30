import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {NavLink} from 'react-router-dom';
import React, {ChangeEvent} from 'react';
import {colorBlueMI} from '../../../../n1-main/m1-ui/utilities/for css';
import {useDispatch} from "react-redux";
import {setUserID} from "../../../../n1-main/m2-bll/reducers/packsReducer";


type PropsType = {
    isButton: boolean;
    isArrowBack?: boolean;
    titleSearch: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    callBack?: (open: boolean) => void;
    location: string;
}


export const Search = ({isArrowBack, isButton, titleSearch, onChange, value, callBack,location}: PropsType) => {
    const dispatch = useDispatch()

    const onClick = () => {
        callBack && callBack(true);
    }
    return (
        <Grid container
              xs={12}
              sx={{backgroundColor: 'ghostwhite', minHeight: '10vh', padding: '5px', margin: 0}}
              justifyContent={'space-around'}
              alignItems={'center'}
        >
            <Grid item xs={6}>
                <Typography variant={'h6'}>
                    {isArrowBack &&
                    <NavLink to={'/packsCards'}
                             style={{textDecoration: 'none'}}
                             onClick={()=>dispatch(setUserID(""))}
                    >
                        <ArrowBackIcon
                            style={{color: 'rgb(63, 81, 181)', position: 'relative', top: '5px', marginRight: '5px'}}
                        />
                    </NavLink>}
                    <span style={{color: colorBlueMI}}> {titleSearch}</span>
                </Typography>
                <TextField
                    fullWidth={true} size={'small'}
                    variant={'standard'} placeholder={`search ${location}`}
                    value={value}
                    onChange={onChange}

                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            {
                isButton &&
                <Grid item xs={3}>

                    <Button variant={'contained'}
                            onClick={onClick}
                            color={'primary'} size={'small'}>Add pack</Button>


                </Grid>
            }

        </Grid>
    )
}