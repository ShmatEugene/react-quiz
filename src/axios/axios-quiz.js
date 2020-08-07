import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-f3349.firebaseio.com/'
})