import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import React, {useState} from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {colorBlueMI} from '../../utilities/for css';


type PropsType = {
    nameCell: string;
    handlerSetSortPacs?: (sortValue: string) => void;
}
export const ButtonForTablePacks = ({nameCell, handlerSetSortPacs}: PropsType) => {

    const [arrow, setArrow] = useState(true);

    let onClickHandler = () => {
        if (arrow) {
            handlerSetSortPacs && handlerSetSortPacs(`0${nameCell}`);
            setArrow(!arrow);
        } else {
            handlerSetSortPacs && handlerSetSortPacs(`1${nameCell}`);
            setArrow(!arrow);
        }

    };
    return (
        <button
            style={{
                width: '27px',
                color: colorBlueMI,
                border: 'none',
                position: 'relative',
                top: '5px',
                cursor: "pointer",
            }}
            onClick={onClickHandler}
        >
            {
                arrow ? <ArrowDownwardIcon/> : <ArrowUpwardIcon/>
            }


        </button>
    )
}