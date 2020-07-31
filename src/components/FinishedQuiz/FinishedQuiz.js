import React from 'react'
import classes from './FinishedQuiz.module.scss'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total++
        }
        return total
    })

    return(
        <>
            <h1 className={classes.FinishedQuiz}>Finished</h1>
            <ul>
                {   
                    props.quiz.map((questonItem, index) => {
                        const cls = [
                            props.results[index + 1]
                        ]
                        return(
                            <li
                                key={index}
                                className={classes[cls.join(' ')]}
                            >
                                <strong>{index + 1}</strong>
                                {questonItem.question}
                            </li>
                        )

                    })
                }
            </ul>
            <p>Правльно отвечено на {successCount} из {props.quiz.length} воросов</p>
            <Button
                onClick={props.onRetry}
                type='primary'
            >
                Повторить
            </Button>
            <Link to={'/'}>
                <Button
                    type='success'
                >
                    Список тестов
                </Button>
            </Link>
        </>
    )
}

export default FinishedQuiz