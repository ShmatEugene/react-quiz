import React, {Component} from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from 'react-router-dom'

export default class QuizList extends Component {

    renderQuizzes() {
        return [1, 2, 3].map((a, i) => {
            return (
                <li
                    key={i}
                >
                    <NavLink to={'/quiz/' + a}>
                        Тест {a}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <h1>QuizList</h1>
                <ul>
                    {this.renderQuizzes()}
                </ul>
            </div>
        )
    }
}

