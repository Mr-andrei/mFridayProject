import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/RoutesComponent';
import {useTypedSelector} from '../../m2-bll/redux';
import {useDispatch} from 'react-redux';
import {setLogoutT} from '../../m2-bll/reducers/authReducer';
import LinearIndeterminate from '../common/Preloader/unused/LinearMI';
import icon from "../../../assets/flashcards.png"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);
type PropsType = {
    switchDrawer: (t: boolean) => void
}
export default function HeaderMI({switchDrawer}: PropsType) {
    const classes = useStyles();
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const status = useTypedSelector(state => state.app.status)
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(setLogoutT());
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">

                <Toolbar>

                    <IconButton onClick={() => {
                        switchDrawer(true)
                    }} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <div style={{backgroundColor:'white', marginRight:'25px'}} >
                        <img src={icon} alt="icon" style={{height:'50px', width:'50px'}}/>
                    </div>
                    <Typography variant="h6" className={classes.title}>
                        cards 2022
                    </Typography>
                    {isAuth
                        ? <Button color="inherit" onClick={handleLogOut}>Log Out</Button>
                        : <Button color="inherit"><NavLink style={{textDecoration: 'none', color: 'white'}}
                                                           to={PATH.LOGIN}>Login</NavLink></Button>
                    }
                </Toolbar>
                {status === 'loading' && <LinearIndeterminate/>}
            </AppBar>
        </div>
    );
}
