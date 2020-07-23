import React, {Component} from 'react'
import classes from '../../css/layout.module.scss'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'


class Layout extends Component {

    state = {
        isMenuOpen: false
    }

    openHandler = () => {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer
                    isOpen = {this.state.isMenuOpen}
                    onClose = {this.openHandler}
                />
                <MenuToggle
                    isOpen = {this.state.isMenuOpen}
                    onToggle = {this.openHandler}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}


export default Layout