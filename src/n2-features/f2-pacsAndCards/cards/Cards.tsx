import Grid from '@mui/material/Grid';
import {TableCards} from './tableCards/TableCards';

export const Cards = () => {
    return (
        <Grid container sx={{marginTop: 1}}>
            <Grid item xs={12} sx={{minHeight: '70vh'}}>
                <TableCards/>
            </Grid>
        </Grid>
    );
}