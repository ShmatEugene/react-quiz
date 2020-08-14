import React, {Component} from 'react'
import classes from './Quiz.module.scss'
import ActiveQuiz from '../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../components/FinishedQuiz/FinishedQuiz'
import Loader from '../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../store/actions/quiz'


class Quiz extends Component {
    // state = {
    //     activeQuestion: 0,
    //     isFinished: false,
    //     answerState: null,
    //     results: {},
    //     quiz: [],
    //     loading: true
    // }

    onAnswerClickHandler = (answerId) => {
        this.props.quizAnswerClick(answerId)
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

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return(
            <div className={classes.Quiz}>
                <h1>Quiz</h1>
                <div>
                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished 
                        ? <FinishedQuiz
                            results = {this.props.results}
                            quiz = {this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        />
                        : <ActiveQuiz
                            answers = {this.props.quiz[this.props.activeQuestion].answers}
                            question = {this.props.quiz[this.props.activeQuestion].question}
                            onAnswerClick = {this.props.quizAnswerClick}
                            quizLength = {this.props.quiz.length}
                            activeQuestion = {this.props.activeQuestion + 1}
                            answerState = {this.props.answerState}
                        />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeQuestion: state.quiz.activeQuestion,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)