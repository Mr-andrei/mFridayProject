import Grid from '@mui/material/Grid';
import img_envelope from './img/envelope-4313721_640 (3).png';
import {Box} from '@mui/material';
import React from 'react';

export const CheckEmail = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
        }}><Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
                padding: 5,
                border: '2px solid lightgrey',
                borderRadius: 3,
                width: 350,
                height: '80%',
                backgroundColor: 'whitesmoke',
                '&:hover': {
                    backgroundColor: 'white',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <img src={img_envelope} alt={'envelope'}/>
                    <h1>Check Email</h1>
                </Grid>
                <Grid item
                      sx={{
                          marginTop: '70px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          fontSize: '0.8rem',
                          padding: '0 20px',
                          lineHeight: '1.3rem',
                      }}
                >
                    <span>We`ve sent an Email with instructions
                        to example@gmail.com</span>
                </Grid>
            </Grid>
        </Box>
        </div>
    )
}