import React, {Component} from 'react'
import classes from './Auth.module.scss'
import Button from './../../components/UI/Button/Button'
import Input from './../../components/UI/Input/Input'
import is from 'is_js'
import { connect } from 'react-redux'
import { auth } from '../../store/actions/auth'


class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                errorMessage: 'Неправильно введен E-mail',
                touched: false,
                label: 'Email',
                valid: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                errorMessage: 'Неправильно введен пароль',
                touched: false,
                label: 'Пароль',
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )

        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // }
        // try {
        //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCzebQp-xhfZYJz2Lw-F3UnaE1E2WTyroQ', authData)
        //     console.log(response.data);
        // } catch (e) {
        //     console.log(e);
        // }
    }

    registerHandler = () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )


        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true
        // }
        // try {
        //     const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCzebQp-xhfZYJz2Lw-F3UnaE1E2WTyroQ', authData)
        //     console.log(response.data);
        // } catch (e) {
        //     console.log(e);
        // }
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if(!validation) {
            return true
        }
        let isValid = true
        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if(validation.email) {
            isValid = is.email(value) && isValid
        }
        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        
        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    label={control.label}
                    value={control.value}
                    type={control.type}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    touched={control.touched}
                    validation={control.validation}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div className={classes.AuthBlock}>
                    <h1>Авторизация</h1>
                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        
                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
        
    
}


function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)