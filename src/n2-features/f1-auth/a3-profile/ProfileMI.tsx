import {Box, Button, Input} from '@mui/material';
import Grid from '@mui/material/Grid';
import img_log from './img/jester1.png';
import React, {ChangeEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {DateTime} from 'luxon';
import {colorBlueMI, widthLogo} from '../../../n1-main/m1-ui/utilities/for css';
import {setNewNameAvatarTC} from '../../../n1-main/m2-bll/reducers/authReducer';
import {useDispatch} from 'react-redux';

export const ProfileMI = () => {
    const user = useTypedSelector(state => state.auth.user)
    const isAuth = useTypedSelector(state => state.auth.isAuth)
    const registerData = DateTime.fromISO(user.created).toFormat('DDD')
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const setAvatar = () => {
        dispatch(setNewNameAvatarTC({avatar: photo, name}))
        setPhoto('');
        setName('');
    }

    const setNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const setPhotos = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoto(e.currentTarget.value)
    }
    const styleSpan = {color: colorBlueMI, fontSize: '0.9rem'};
    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '85vh',
            marginTop: 5,
        }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 5,
                    padding: 5,
                    border: '2px solid lightgrey',
                    borderRadius: 3,
                    width: 350,
                    height: '90%',
                    backgroundColor: 'whitesmoke',
                    '&:hover': {
                        backgroundColor: 'white',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                <Grid container justifyContent={'center'}>
                    <Grid item justifyContent={'center'}>
                        {user.avatar
                            ? <img src={user.avatar} style={widthLogo} alt="AVATAR"/>
                            : <img src={img_log} style={widthLogo} alt={'logo'}/>
                        }

                    </Grid>
                    <Grid item
                          sx={{
                              marginTop: '15px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-start',
                              flexDirection: 'column',
                              fontSize: '0.8rem',
                              padding: '0 20px',
                              lineHeight: '1.3rem',

                          }}
                    >
                        <span><span style={styleSpan}>Email: </span> {user.email}</span>
                        <span><span style={styleSpan}>Name: </span>{user.name}</span>
                        <span><span style={styleSpan}>Cards count: </span>{user.publicCardPacksCount}</span>
                        <span><span style={styleSpan}>Registartion: </span>{registerData}</span>
                        <div>

                            <Input size={'small'}
                                   placeholder={'http://...'}
                                   type={'text'}
                                   onChange={setPhotos}
                                   value={photo}
                                   style={{marginTop: '10px', minHeight: '10px'}}

                            />
                            <div style={{fontSize: '0.7rem', textAlign: 'center', color: 'grey'}}>change avatar</div>
                            <Input size={'small'}
                                   placeholder={'New name'}
                                   type={'text'}
                                   onChange={setNickName}
                                   value={name}
                            />
                            <div style={{fontSize: '0.7rem', textAlign: 'center', color: 'grey'}}>change name</div>
                        </div>

                        <Button onClick={setAvatar} size={'small'}
                                style={{fontSize: '0.7rem', marginTop: '10px'}}> CHANGE AVATAR OR NAME </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}