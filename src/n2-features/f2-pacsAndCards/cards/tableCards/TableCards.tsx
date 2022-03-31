import React, {ChangeEvent, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {DateTime} from 'luxon';
import {useTypedSelector} from '../../../../n1-main/m2-bll/redux';
import {ButtonForTablePacks} from '../../../../n1-main/m1-ui/common/ComponentsForTabels/ButtonForTablePacks';
import Rating from '@mui/material/Rating';
import BasicButtonGroup from '../../../../n1-main/m1-ui/common/ComponentsForTabels/BasicButtonGroup';
import {PATH} from '../../../../n1-main/m1-ui/routes/RoutesComponent';
import {Navigate, useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import {Search} from '../../packs/rightPanel/Search';
import {
    getCardsTC,
    setCardsCurrentPage, setCardsQuestion,
    setCardsSortValue, setIdCardsAC
} from '../../../../n1-main/m2-bll/reducers/cardReducer';
import {useDispatch} from 'react-redux';
import ModalMi from '../../../../n1-main/m1-ui/modal/ModalMI';
import {useDebounce} from 'use-debounce';
import {Pagination} from '@material-ui/lab';
import {CardType} from '../../../../n1-main/m2-bll/api/cards-a-p-i';


interface Column {
    id: 'question' | 'answer' | 'updated' | 'grade' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string) => string;
}

const columns: Column[] = [
    {id: 'question', label: `Question`, minWidth: 200},
    {id: 'answer', label: 'Answer', minWidth: 200},
    {
        id: 'updated',
        label: 'Update',
        minWidth: 100,
        align: 'right',
        format: (value: string) => DateTime.fromISO(value).toFormat('DDD'),
    },
    {
        id: 'grade',
        label: 'Grade',
        minWidth: 100,
        align: 'right',
        format: (value: string) => DateTime.fromISO(value).toFormat('DDD'),
    },
    {
        id: 'actions',
        label: '',
        minWidth: 50,
        align: 'right',
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 500,
    },
});

export const TableCards = () => {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    const {cardId, packNameURL} = useParams()
    const dispatch = useDispatch()
    // get value
    const rows: CardType[] = useTypedSelector(state => state.cards.data.cards);
    const cardsTotalCount = useTypedSelector(state => state.cards.data.cardsTotalCount);
    const packName = useTypedSelector(state => state.cards.packName);
    // auth value
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    // set Value
    const cardsSortValue = useTypedSelector(state => state.cards.getData.sortCards);
    const cardsPageCount = useTypedSelector(state => state.cards.getData.pageCount);
    const cardsCurrentPage = useTypedSelector(state => state.cards.getData.page);
    const cardsQuestion = useTypedSelector(state => state.cards.getData.cardQuestion);
    // value modal

    const cardsQuestionDebounce = useDebounce(cardsQuestion, 1000)

    // set cards function
    useEffect(() => {
        packNameURL && cardId && dispatch(setIdCardsAC(cardId, packNameURL))
        dispatch(getCardsTC())
    }, [cardId, cardsCurrentPage, cardsSortValue, cardsQuestionDebounce[0]])


    const handlerSetSortCards = (sortValue: string) => {
        dispatch(setCardsSortValue(sortValue))
    }
    const paginationHandler = (value: number) => {
        dispatch(setCardsCurrentPage(value))
    }
    const setSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCardsQuestion(e.currentTarget.value))
    }

    if (!isAuth) return <Navigate to={PATH.LOGIN}/>
    return (
        <>
            <Search
                isButton={false}
                titleSearch={packName}
                onChange={setSearchHandler}
                value={cardsQuestion}
                location={'card'}
            />
            <Paper className={classes.root}>

                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => {
                                    if (index > 3) {
                                        return (

                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >

                                                {
                                                    column.id === 'actions'
                                                        ?
                                                        <Button variant={'contained'} color={'primary'}
                                                                size={'small'} onClick={() => setOpen(true)}>
                                                            Add
                                                        </Button>
                                                        : column.label
                                                }
                                            </TableCell>
                                        )
                                    } else {
                                        return (

                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{minWidth: column.minWidth}}
                                            >
                                                {column.label}
                                                <ButtonForTablePacks handlerSetSortPacs={handlerSetSortCards}
                                                                     nameCell={column.id}/>
                                            </TableCell>
                                        )
                                    }

                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(0, cardsPageCount + cardsPageCount).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {

                                            const value = row[column.id];

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'grade'
                                                        ?
                                                        <Rating name="read-only" value={row.grade} readOnly
                                                                precision={0.5}/>
                                                        : column.id === 'actions'
                                                            ?
                                                            <BasicButtonGroup name_2={'Del'}
                                                                              name_3={'Update'}
                                                                              userId={false}
                                                                              color={true}
                                                                              titleOfPage={'Card'}
                                                                              nameOfCell={row.question}
                                                                              id={row._id}
                                                                              questionText={row.question}
                                                                              answerText={row.answer}
                                                            />
                                                            : column.format && typeof value === 'string'
                                                                ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <div style={{marginTop: '30px'}}>
                    {cardsTotalCount > 10 ?
                        <Pagination
                            count={Math.ceil(cardsTotalCount / cardsPageCount)}
                            onChange={(event: ChangeEvent<unknown>, page: number) => paginationHandler(page)}
                            color="primary"/>
                        : null}
                </div>
            </Paper>
            <ModalMi
                title={'Add card'}
                open={open}
                setOpen={setOpen}
                type={'input'}
                titleOfPage={'Card'}
            />
        </>
    );
}

