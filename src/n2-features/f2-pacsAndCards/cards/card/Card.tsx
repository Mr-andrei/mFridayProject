import {useTypedSelector} from "../../../../n1-main/m2-bll/redux";
import {CardType} from "../../../../n1-main/m2-bll/api/cards-a-p-i";
import React, {useEffect, useState} from "react";
import s from "./card.module.css"
import {NavLink, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateCardGradeTC} from "../../../../n1-main/m2-bll/reducers/cardReducer";
import {setUserID} from "../../../../n1-main/m2-bll/reducers/packsReducer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import {getCard} from "../../../../n1-main/m1-ui/utilities/getCard";


export const Card = () => {
    const dispatch = useDispatch()
    const {packNameURL} = useParams<'packNameURL'>()

    const cardsForLearn = useTypedSelector(state => state.cards.cardsForLearn)

    const [card, setCard] = useState<CardType[]>([])
    const [showAnswer, setShowAnswer] = useState(false)
    const [valueRadio, setValueRadio] = useState(0)


    useEffect(() => {
        setCard(getCard(cardsForLearn))
    }, [])

    const nextCardHandler = () => {
        if (packNameURL && valueRadio !== 0) {
            dispatch(updateCardGradeTC({grade: valueRadio, card_id: card[0]._id}))
            setCard(getCard(cardsForLearn))
            setShowAnswer(false)
            setValueRadio(0)
        }
        if (valueRadio === 0) {
            setCard(getCard(cardsForLearn))
            setShowAnswer(false)
            setValueRadio(0)
        }
    }

    return (
        <div className={s.card_container_flex}>

            <NavLink to={'/packsCards'}
                     style={{textDecoration: 'none'}}
                     onClick={() => dispatch(setUserID(""))}
            >
                <ArrowBackIcon
                    style={{
                        color: 'rgb(63, 81, 181)',
                        position: 'relative',
                        top: '60px',
                        left: "100px",
                        marginRight: '5px'
                    }}
                />
            </NavLink>

            <div className={s.card_container}>
                <div>
                    {card.map((m) => (
                        <div className={s.question} key={m._id}><span
                            className={s.text_question}> Question : {m.question} </span></div>
                    ))}

                    <Button style={{fontSize: '0.8rem'}} variant="contained" onClick={() => setShowAnswer(true)}>
                        Show answer
                    </Button>
                </div>
                {showAnswer &&
                <div>
                    {card.map((m,) => (
                        <div className={s.question} key={m._id}><span
                            className={s.text_question}> Answer : {m.answer} </span></div>
                    ))}
                    <div>
                        <span className={s.mainText}>Rate yourself:</span>
                        <label className={s.inputForm} style={{display: 'flex'}}>
                            <input type="radio" onChange={() => setValueRadio(5)} value={valueRadio}
                                   name='rate'/>Knew the answer
                        </label>
                        <label className={s.inputForm} style={{display: 'flex'}}>
                            <input type="radio" onChange={() => setValueRadio(4)} value={valueRadio}
                                   name='rate'/>Confused
                        </label>
                        <label className={s.inputForm} style={{display: 'flex'}}>
                            <input type="radio" onChange={() => setValueRadio(3)} value={valueRadio}
                                   name='rate'/>A lot of thought
                        </label>
                        <label className={s.inputForm} style={{display: 'flex'}}>
                            <input type="radio" onChange={() => setValueRadio(2)} value={valueRadio}
                                   name='rate'/>Forgot
                        </label>
                        <label className={s.inputForm} style={{display: 'flex'}}>
                            <input type="radio" onChange={() => setValueRadio(1)} value={valueRadio}
                                   name='rate'/>Don`t know
                        </label>
                    </div>
                    <Button style={{fontSize: '0.7rem'}} variant="contained" onClick={nextCardHandler}>
                        Next
                    </Button>
                </div>
                }
            </div>

        </div>
    )
}


