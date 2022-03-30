import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import React, {ChangeEvent} from 'react';
import {colorBlueMI} from '../../../../n1-main/m1-ui/utilities/for css';



type PropsType = {
    isButton: boolean;
    titleSearch: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    callBack?: (open: boolean) => void;
    location: string;
}


export const Search = ({ isButton, titleSearch, onChange, value, callBack,location}: PropsType) => {

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