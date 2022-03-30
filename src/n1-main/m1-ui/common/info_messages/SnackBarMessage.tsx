import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useTypedSelector} from '../../../m2-bll/redux';
import {useDispatch} from 'react-redux';
import {setErrorN, setSuccess} from '../../../m2-bll/reducers/appReducer';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackBarMessage() {
    const error = useTypedSelector(state => state.app.error);
    const success = useTypedSelector(state => state.app.success)
    const dispatch = useDispatch();


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorN(null));
        dispatch(setSuccess(null));
    };

    return (
        <div>
            <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}
                       anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
            <Snackbar open={success !== null} autoHideDuration={6000} onClose={handleClose}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                <Alert onClose={handleClose} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </div>
    );
}
