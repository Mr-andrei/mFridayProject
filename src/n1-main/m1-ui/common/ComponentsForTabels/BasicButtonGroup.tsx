import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useDispatch} from 'react-redux';
import {getCardsForLearn} from '../../../m2-bll/reducers/cardReducer';
import ModalMi from '../../modal/ModalMI';

type PropsType = {
    userId: boolean;
    name_1?: string;
    name_2: string;
    name_3: string;
    color?: boolean;
    titleOfPage: string;
    nameOfCell: string;
    id: string;
    nameOfPack?: string;
    questionText?: string;
    answerText?: string;

}
//
const fontSize = {fontSize: '0.6rem'}
export default function BasicButtonGroup(
    {userId, name_1, name_2, name_3, color, titleOfPage, nameOfCell, id, questionText, answerText,}: PropsType) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [typeModel, setTypeModel] = useState('');


    const dispatch = useDispatch();
    const idPack = id;

    let onClick1 = () => {
        setOpen(true);
        setTitle(`Delete ${titleOfPage}`);
        setTypeModel('delete');
    };
    const onClick3 = async () => {
        await dispatch(getCardsForLearn(idPack, nameOfCell));
        setTitle(`Learn`);
        setTypeModel('learn');
        setOpen(true);

    };
    const onClick2 = () => {
        setOpen(true);
        setTitle('Edit name');
        setTypeModel('input');
    };
    const onClick4 = () => {
        setOpen(true);
        setTitle('Update card');
        setTypeModel('input');
    }

    return (
        <>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" size={'small'}>
                {userId && <Button style={fontSize}
                                   color={'secondary'}
                                   onClick={onClick1}
                >
                    {name_1}
                </Button>}
                {
                    color
                        ? <Button
                            style={fontSize} color={'secondary'} onClick={onClick1}>
                            {name_2}
                        </Button>
                        :
                        <Button style={fontSize} onClick={onClick2}>
                            {name_2}
                        </Button>
                }

                {name_3 === 'Learn'
                    ? <Button style={fontSize} onClick={onClick3}>{name_3}</Button>
                    : <Button style={fontSize} onClick={onClick4}>{name_3}</Button>
                }
            </ButtonGroup>
            <ModalMi
                title={title} open={open}
                setOpen={setOpen} titleOfPage={titleOfPage}
                type={typeModel} id={id}
                nameOfCell={nameOfCell}
                questionText={questionText}
                answerText={answerText}
            />
        </>
    );
}