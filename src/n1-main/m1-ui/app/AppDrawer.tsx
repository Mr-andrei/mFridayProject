import {Drawer, MenuItem} from '@mui/material';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/RoutesComponent';
import s from '../header/Header.module.css';

type PropsType = {
    toggle: boolean;
    switchDrawer: (t: boolean) => void
}
export const AppDrawer = ({toggle, switchDrawer}: PropsType) => {

    return (
        <Drawer open={toggle} onClose={() => switchDrawer(false)}>
            <MenuItem><NavLink to={PATH.LOGIN} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Login</NavLink></MenuItem>
            <MenuItem><NavLink to={PATH.REGISTRATION}
                               className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                   : s.links)}>Registration</NavLink></MenuItem>
            <MenuItem><NavLink to={PATH.PROFILE} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Profile</NavLink></MenuItem>

            <MenuItem><NavLink to={PATH.PACKS_CARDS}
                               className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                   : s.links)}>Packs of Cards</NavLink></MenuItem>

            <MenuItem><NavLink to={PATH.PAGE_NOT_FOUND}
                               className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                   : s.links)}>Page not found</NavLink></MenuItem>
            <MenuItem><NavLink to={PATH.PASSWORD_RECOVERY}
                               className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                   : s.links)}>Password recovery</NavLink></MenuItem>
            <MenuItem><NavLink to={PATH.CREATING_NEW_PASSWORD}
                               className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                   : s.links)}>Create new password</NavLink></MenuItem>
            <MenuItem><NavLink to={PATH.TEST_PAGE}
                               className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                   : s.links)}>Test Page</NavLink></MenuItem>
        </Drawer>
    );
}