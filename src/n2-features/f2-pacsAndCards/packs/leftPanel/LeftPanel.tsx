import React from 'react';
import Grid from '@mui/material/Grid';
import {ButtonsAndSlider} from './ButtonsAndSlider';



export const LeftPanel = () => {

    return (
        <Grid container xs={4} md={3} xl={2}
            sx={{backgroundColor:'whitesmoke'}}
        >
            <ButtonsAndSlider/>
        </Grid>
    )
}
