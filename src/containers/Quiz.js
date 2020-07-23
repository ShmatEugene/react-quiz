import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz'



class Quiz extends Component {
    state = {
        activeQuestion: 0,
        isFinished: false,
        answerState: null,
        results: {},
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
        
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]

            if(this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        
        if(question.rightAnswer === answerId) {
            if(!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            })
            const timeout = window.setTimeout(() => {
                if(this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    }


    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return(
            <div className={classes.Quiz}>
                <h1>Quiz</h1>
                <div>
                    {
                        this.state.isFinished 
                        ? <FinishedQuiz
                            results = {this.state.results}
                            quiz = {this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                        : <ActiveQuiz
                            answers = {this.state.quiz[this.state.activeQuestion].answers}
                            question = {this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick = {this.onAnswerClickHandler}
                            quizLength = {this.state.quiz.length}
                            activeQuestion = {this.state.activeQuestion + 1}
                            answerState = {this.state.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz