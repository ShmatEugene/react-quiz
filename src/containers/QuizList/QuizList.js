import React, {Component} from 'react'
import classes from './QuizList.module.scss'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import {fetchQuizzes} from '../../store/actions/quiz'
 
class QuizList extends Component {
    renderQuizzes() {
        return this.props.quizzes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }
    
    componentDidMount() {
        this.props.fetchQuizzes()
    }
    

    render() {
        return (
            <div className={classes.QuizList}>
                <h1>QuizList</h1>
                {
                    this.props.loading && this.props.quizzes !== 0
                    ? <Loader /> 
                    : <ul>
                        {this.renderQuizzes()}
                    </ul>
                } 
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizzes: state.quiz.quizzes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)