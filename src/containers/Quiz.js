import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
    state = {
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'Вопрос 1',
                rightAnswer: 1,
                id: 1,
                answers: [
                    {text: 'Ответ 1', id: 1},
                    {text: 'Ответ 2', id: 2},
                    {text: 'Ответ 3', id: 3},
                    {text: 'Ответ 4', id: 4},
                ]
            },
            {
                question: 'Вопрос 2',
                rightAnswer: 2,
                id: 2,
                answers: [
                    {text: '2Ответ 1', id: 1},
                    {text: '2Ответ 2', id: 2},
                    {text: '2Ответ 3', id: 3},
                    {text: '2Ответ 4', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answerId) => {
        const question = this.state.quiz[this.state.activeQuestion]

        if(question.rightAnswer === answerId) {
            this.setState({
                answerState: {[answerId]: 'success'}
            })
            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    console.log('Finished');
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
    }


    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    render() {
        return(
            <div className={classes.Quiz}>
                <h1>Quiz</h1>
                <div>
                    <ActiveQuiz
                        answers = {this.state.quiz[this.state.activeQuestion].answers}
                        question = {this.state.quiz[this.state.activeQuestion].question}
                        onAnswerClick = {this.onAnswerClickHandler}
                        quizLength = {this.state.quiz.length}
                        activeQuestion = {this.state.activeQuestion + 1}
                        answerState = {this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz