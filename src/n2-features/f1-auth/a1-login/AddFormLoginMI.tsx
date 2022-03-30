import React, {useState} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {Navigate, NavLink} from 'react-router-dom';
import {useTypedSelector} from '../../../n1-main/m2-bll/redux';
import {PATH} from '../../../n1-main/m1-ui/routes/RoutesComponent';
import * as Yup from 'yup';
import {setLoginT, setRegistered} from '../../../n1-main/m2-bll/reducers/authReducer';
import {Box, IconButton, Input, InputAdornment, InputLabel} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {redStyle} from '../../../n1-main/m1-ui/utilities/for css';
import {BlankDiv} from '../../../n1-main/m1-ui/common/ComponentsForTabels/BlankDiv';

type State = {
    password: string;
    showPassword: boolean;
    email: string;
}
export const AddFormLoginMI = () => {
    const dispatch = useDispatch();
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
        email: '',
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({

            password: Yup.string()
                .min(8, 'Must be 8 characters or more')
                .required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: values => {
            dispatch(setLoginT(values))
            formik.resetForm();
        },
    });
    {
        if (isAuth) return <Navigate to={PATH.PROFILE}/>
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 5,
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
                    <form onSubmit={formik.handleSubmit}>

                        <FormLabel sx={{marginBottom: 5}}>
                            <h2>Sign In</h2>
                        </FormLabel>
                        <FormControl>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                id={'email'}
                                type={'text'}
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email
                                ? <div style={redStyle}>{formik.errors.email}</div>
                                : null}
                        </FormControl>
                        <BlankDiv/>
                        <FormControl>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="password"
                                type={values.showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }

                            />
                            {formik.touched.password && formik.errors.password
                            && <div style={redStyle}>{formik.errors.password}</div>}
                        </FormControl>

                        <FormControl>
                            <FormControlLabel
                                sx={{marginTop: '20px'}}
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        size={'small'}
                                        {...formik.getFieldProps('rememberMe')}
                                    />
                                }/>
                            <p style={{margin: '30px 0 90px 100px', fontSize: '0.8rem'}}>
                                <NavLink style={{textDecoration: 'none', color: 'blue'}} to={PATH.PASSWORD_RECOVERY}>Forgot
                                    Password</NavLink>
                            </p>
                            <Button
                                sx={{
                                    marginTop: '30%',
                                    height: 25,
                                    width: 200,
                                    borderRadius: 10,
                                    fontSize: '0.5rem',
                                }}
                                type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormControl>
                    </form>

                </Grid>
                <Grid item
                      sx={{
                          marginTop: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',

                      }}
                >
                    <div style={{fontSize: '0.7rem'}}>Don`t have an account?</div>
                    <div><NavLink
                        style={{textDecoration: 'none', fontSize: 'small', color: 'blue'}}
                        to={PATH.REGISTRATION}

                    >Sign Up
                    </NavLink></div>
                </Grid>
            </Grid>
        </Box>
    )
}