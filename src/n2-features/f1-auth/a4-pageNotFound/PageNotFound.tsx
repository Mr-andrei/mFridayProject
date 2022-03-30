import img_404 from './img/Error 404 White.jpg'
import Grid from '@mui/material/Grid';

export const PageNotFound = () => {
    return (
        <Grid container justifyContent={'center'}>
            <img src={img_404} alt={'page not found '}/>
        </Grid>
    )
}