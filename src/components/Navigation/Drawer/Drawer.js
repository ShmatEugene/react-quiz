import React, {Component} from 'react'
import classes from './Drawer.module.scss'
import Backdrop from '../../UI/Backdrop/Backdrop'


const Links = [
    1, 2, 3
]

class Drawer extends Component {

    renderLinks () {
        return Links.map((link, index) => {
            return(
                <li
                    key={index}
                >
                    <a href="http://localhost:3000/">Link {link}</a>
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