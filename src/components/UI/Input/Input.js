import React from 'react'
import classes from './Input.module.scss'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = props => {

    const inputType = props.type || 'text'
    const csl = [classes.Input]
    const htmlFor = inputType + '-' + Math.random()

    if(isInvalid(props)) {
        csl.push(classes.invalid)
    }

    return (
        <div className={csl.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props) 
                    ? <span>{props.errorMessage || 'Введите верное значение'}</span>
                    : null
            }
            
        </div>
    )
}

export default Input