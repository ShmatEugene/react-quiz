import axios from '../../axios/axios-quiz'
import { FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS, FETCH_QUIZZES_ERROR, FETCH_QUIZ_SUCCESS, QUIZ_SET_STATE, FINISH_QUIZ, QUIZ_NEXT_QUESTION, RETRY_QUIZ } from './actionTypes'


export function fetchQuizzes() {
    
    return async dispatch => {
        dispatch(fetchQuizzesStart())
        try {
            const response = await axios.get('quizzes.json')
            const quizzes = []
            
            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key,
                    name: `Test ${index + 1}`
                })
            })

            dispatch(fetchQuizzesSuccess(quizzes))

            this.setState({
                quizzes,
                loading: false
            })
        } catch(e) {
            dispatch(fetchQuizzesError(e))
        }
    }
}


export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizzesStart())
        try {
            const response = await axios.get(`/quizzes/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizzesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START
    }
}

export function fetchQuizzesSuccess(quizzes) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes
    }
}

export function fetchQuizzesError(e) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error: e
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}


export function quizAnswerClick(answerId) {
   return (dispatch, getState) => {
        const state = getState().quiz
        if(state.answerState) {
            const key = Object.keys(state.answerState)[0]

            if(state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion]
        const results = state.results
        
        if(question.rightAnswerId === answerId) {
            if(!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            const timeout = window.setTimeout(() => {
                
                if(isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
        }
   } 
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}





