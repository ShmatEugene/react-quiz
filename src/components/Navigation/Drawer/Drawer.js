import React, {Component} from 'react'
import classes from './Drawer.module.scss'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'


const Links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: true},
    {to: '/quiz-creator', label: 'Создать тест', exact: true}

]

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks () {
        return Links.map((link, index) => {
            return(
                <li
                    key={index}
                >
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
                )
        })
    }
    
    render() {

        const cls = [classes.Drawer]
        if(!this.props.isOpen) {
            cls.push(classes.closed)
        }
        return(
            <>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </> 
        )
    }
}

export default Drawer