import {combineReducers} from 'redux'
import quizReducer from './quiz'
import creacteReducer from './create'
import authReducer from './auth'

export default combineReducers({
    quiz: quizReducer,
    create: creacteReducer,
    auth: authReducer
})