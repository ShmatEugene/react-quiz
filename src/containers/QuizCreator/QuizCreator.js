import React, {Component} from 'react'
import classes from './QuizCreator.module.scss'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Select from '../../components/UI/Select/Select'
import {createControl, validate} from '../../form/formFramework'
import axios from '../../axios/axios-quiz'

function createOptionControl(num) {
    return createControl({
        label: `Вариант ответа ${num}`,
        errorMessage: 'Значение не может быть пустым',
        id: num
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не должен быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addRequestHandler = event => {
        event.preventDefault()

        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    }

    createQuizHandler = async event => {
        event.preventDefault()

        try {
            await axios.post('quizzes.json', this.state.quiz)
            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls()
            })
        } catch (e) {
            console.log(e);
        }
    }

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = value
        control.touched = true
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            isFormValid, 
            formControls
        })

    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return(
                <React.Fragment key={'react-fragment' + index}>
                    <Input
                        key={controlName + index}
                        label={control.label}
                        value={control.value}
                        errorMessage={control.errorMessage}
                        valid={control.valid}
                        touched={control.touched}
                        validation={control.validation}
                        shouldValidate={!!control.validation}
                        onChange={event => this.changeHandler(event.target.value, controlName)}
                    />
                    { index === 0 ? <hr /> : null }
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />

        return (
            <div className={classes.QuizCreator}>
                <div>
                <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderControls()}
                        {select}
                        <Button
                            type="primary"
                            onClick={this.addRequestHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.state.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                        
                    </form>
                </div>
            </div>
        )
    }
}

