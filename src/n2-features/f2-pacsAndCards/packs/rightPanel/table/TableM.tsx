import React, {ChangeEvent, useEffect} from 'react';
import s from './tableM.module.css'
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {useTypedSelector} from '../../../../../n1-main/m2-bll/redux';
import {DateTime} from 'luxon';
import BasicButtonGroup from '../../../../../n1-main/m1-ui/common/ComponentsForTabels/BasicButtonGroup';
import {ButtonForTableCell} from '../../../../../n1-main/m1-ui/common/ComponentsForTabels/ButtonForTableCell';
import {
    getPacksTC,
    setCurrentPage,
    setPageCount,
    setSortPacks
} from '../../../../../n1-main/m2-bll/reducers/packsReducer';
import {useDispatch} from 'react-redux';
import FormControl from '@mui/material/FormControl';
import {InputLabel, NativeSelect,} from '@material-ui/core';
import {useDebounce} from 'use-debounce';
import {ButtonForTablePacks} from '../../../../../n1-main/m1-ui/common/ComponentsForTabels/ButtonForTablePacks';
import {Pagination} from '@material-ui/lab';
import {PackType} from '../../../../../n1-main/m2-bll/api/api';


interface Column {
    id: 'name' | 'cardsCount' | 'updated' | 'created' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string) => string;
}

const columns: Column[] = [
    {id: 'name', label: `Name`, minWidth: 150},
    {id: 'cardsCount', label: 'Count', minWidth: 100},
    {
        id: 'updated',
        label: 'Last Updated',
        minWidth: 100,
        align: 'right',
        format: (value: string) => DateTime.fromISO(value).toFormat('DDD'),
    },
    {
        id: 'created',
        label: 'Created By',
        minWidth: 100,
        align: 'right',
        format: (value: string) => DateTime.fromISO(value).toFormat('DDD'),
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 170,
        align: 'right',
    },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflow: 'auto',
    },
    container: {
        maxHeight: 480,
    },
});

export function TableM() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const rows: PackType[] = useTypedSelector(state => state.packs.data.cardPacks);

    const _userId = useTypedSelector(state => state.auth.user._id);
    const currentPage = useTypedSelector(state => state.packs.getPackData.page);
    const totalCountPage = useTypedSelector(state => state.packs.data.cardPacksTotalCount);
    const pageCount = useTypedSelector(state => state.packs.getPackData.pageCount);
    const packSetMin = useTypedSelector(state => state.packs.getPackData.min);
    const packSetMax = useTypedSelector(state => state.packs.getPackData.max);
    const packsName = useTypedSelector(state => state.packs.getPackData.packName)
    const packsSortValue = useTypedSelector(state => state.packs.getPackData.sortPacks)
    const pacsUserIdGetData = useTypedSelector(state => state.packs.getPackData.user_id)
    const isAuth = useTypedSelector(state => state.auth.isAuth);
    const minValueDebounce = useDebounce(packSetMin, 1000)
    const maxValueDebounce = useDebounce(packSetMax, 1000)
    const cardsNameDebounce = useDebounce(packsName, 1000)

    useEffect(() => {
        if (!isAuth) return;
        dispatch(getPacksTC())
    }, [currentPage, pageCount, minValueDebounce[0],
        maxValueDebounce[0], cardsNameDebounce[0],
        packsSortValue, pacsUserIdGetData])

    const rowsPerPage = pageCount

    const handleChangeSelect = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        dispatch(setPageCount(e.currentTarget.value as number))
    }
    const handlerSetSortPacs = (sortValue: string) => {
        dispatch(setSortPacks(sortValue))
    }
    const paginationHandler = (value: number) => {
        dispatch(setCurrentPage(value))
    }


    return (
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
                                            {column.label}
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
                                            <ButtonForTablePacks
                                                handlerSetSortPacs={handlerSetSortPacs}
                                                nameCell={column.id === 'actions' ? '' : column.id}/>
                                        </TableCell>
                                    )
                                }

                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(0 * rowsPerPage, 0 * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                    {columns.map((column) => {

                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>

                                                {column.id === 'actions'
                                                    ? <BasicButtonGroup
                                                        userId={_userId === row.user_id}
                                                        name_1={'Del'} name_2={'Edit'} name_3={'Learn'}
                                                        titleOfPage={'Pack'}
                                                        nameOfCell={row.name} id={row._id}

                                                        color={false} nameOfPack={row.name}
                                                    />
                                                    : column.id === 'name'
                                                        ? < ButtonForTableCell text={row.name} idPack={row._id}/>
                                                        : column.format && typeof value === 'string' ? column.format(value) : value
                                                }
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

            </TableContainer>
            <div className={s.container_pag}>

                <div className={s.select_container}>
                    <FormControl>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Page count
                        </InputLabel>
                        <NativeSelect
                            defaultValue={pageCount}
                            inputProps={{
                                name: 'Page count',
                                id: 'uncontrolled-native',
                            }}
                            onChange={handleChangeSelect}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={75}>75</option>
                        </NativeSelect>
                    </FormControl>
                </div>
                <Pagination
                    count={Math.ceil(totalCountPage / pageCount)}
                    onChange={(event: ChangeEvent<unknown>, page: number) => paginationHandler(page)}
                    color="primary"/>
            </div>
        </Paper>
    );
}

