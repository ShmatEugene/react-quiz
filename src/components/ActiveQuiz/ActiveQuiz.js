import React from 'react'
import classes from './ActiveQuiz.module.scss'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = props => {
    return(
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>1</strong>
                    {props.question}
                </span>
                <span>{props.activeQuestion} из {props.quizLength}</span>
            </p>
            <AnswersList
                answers = {props.answers}
                onAnswerClick = {props.onAnswerClick}
                answerState = {props.answerState}
            />
        </div>
    )
}

export default ActiveQuiz