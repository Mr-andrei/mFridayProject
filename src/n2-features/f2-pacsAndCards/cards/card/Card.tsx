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

export const Card = () => {
    const getCard = (cards: CardType[]) => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
        const rand = Math.random() * sum;
        const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
                const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
                return {sum: newSum, id: newSum < rand ? i : acc.id}
            }
            , {sum: 0, id: -1});
        console.log('test: ', sum, rand, res)

        return [cards[res.id + 1]];
    }

    const dispatch = useDispatch()

    const {cardIdURL} = useParams<'cardIdURL'>()
    const {packIdURL} = useParams<'packIdURL'>()
    const {packNameURL} = useParams<'packNameURL'>()

    const cardsForLearn = useTypedSelector(state => state.cards.cardsForLearn)
    const [card, setCard] = useState<CardType[]>([])
    const [showAnswer, setShowAnswer] = useState(false)
    const [valueRadio, setValueRadio] = useState(0)


    useEffect(() => {
        setCard(getCard(cardsForLearn))
    }, [cardsForLearn])

    const nextCardHandler = () => {
        if (packNameURL && packIdURL && cardIdURL && valueRadio !== 0) {
            dispatch(updateCardGradeTC({grade: valueRadio, card_id: cardIdURL}))
            setShowAnswer(false)
        }
    }
    return (
        <div className={s.card_container_flex}>

                <NavLink to={'/packsCards'}
                         style={{textDecoration: 'none'}}
                         onClick={() => dispatch(setUserID(""))}
                >
                    <ArrowBackIcon
                        style={{color: 'rgb(63, 81, 181)', position: 'relative', top: '60px',left:"100px", marginRight: '5px'}}
                    />
                </NavLink>

            <div className={s.card_container}>
                <div>
                    {card.map((m) => (
                        <div style={{marginBottom: "10px"}} key={m._id}><span> Question : {m.question} </span></div>
                    ))}

                    <Button style={{fontSize: '0.9rem'}} variant="contained" onClick={() => setShowAnswer(true)} >
                        Show answer
                    </Button>
                    {/*<button*/}
                    {/*   */}
                    {/*    className={s.btn_show_answer}> Show answer*/}
                    {/*</button>*/}
                </div>
                {showAnswer &&
                <div>
                    {card.map((m, ) => (
                        <div style={{margin: "10px, 0"}} key={m._id}><span> Answer : {m.answer} </span></div>
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
                    <Button style={{fontSize: '0.7rem'}} variant="contained" onClick={nextCardHandler} >
                        Next
                    </Button>
                </div>
                }
            </div>

        </div>
    )
}


