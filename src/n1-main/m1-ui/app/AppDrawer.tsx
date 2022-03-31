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
        <Drawer sx={{width:200}} open={toggle} onClose={() => switchDrawer(false)}>
            <MenuItem><NavLink to={PATH.PROFILE} className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                : s.links)}>Profile</NavLink></MenuItem>
            <MenuItem><NavLink to={PATH.PACKS_CARDS}
                               className={({isActive}) => (isActive ? `${s.activeClass} ${s.links}`
                                   : s.links)}>Packs</NavLink></MenuItem>
        </Drawer>
    );
}