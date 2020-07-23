import React from 'react'
import classes from './Button.module.scss'

const Button = props => {

    const cls = [
        classes.Button,
        classes[props.type]
    ]

    return(
        <div>
            <button
                onClick={props.onClick}
                className={cls.join(' ')}
            >
                {props.children}
            </button>
        </div>
    )
}

export default Button