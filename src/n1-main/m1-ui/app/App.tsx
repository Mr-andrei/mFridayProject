import React, {useEffect} from 'react';
import './App.css';
import {useDispatch} from 'react-redux';
import HeaderMI from '../header/HeaderMI';
import {RoutesComponent} from '../routes/RoutesComponent';
import {checkAuthMeTC} from '../../m2-bll/reducers/authReducer';
import SnackBarMessage from '../common/info_messages/SnackBarMessage';
import Container from '@mui/material/Container';
import {useTypedSelector} from '../../m2-bll/redux';
import {BarApp} from '../common/Preloader/BarApp';


const App = () => {

    const dispatch = useDispatch();
    const isRegistered = useTypedSelector(state => state.auth.isRegistered);

    useEffect(() => {
        dispatch(checkAuthMeTC({}));
    }, [])
    if (!isRegistered) return <Container fixed sx={{mt: '0.5rem'}}> <BarApp/></Container>
    return (
        <Container fixed sx={{mt: '0.5rem'}}>
            <SnackBarMessage/>
            <HeaderMI />
            <RoutesComponent/>
        </Container>
    );
}

export default App;
