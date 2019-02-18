import React, { PureComponent } from 'react'
import cls from 'layout.less'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

export default class Header extends PureComponent {
  render() {
    const {loggedIn, logout} = this.props

    return (
      <AppBar position="static" className={cls.header}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={::this.toggleMenuBar}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" className={cls.title}>Administrační rozhraní <span className={cls.secondary}>QWERTY</span></Typography>
          {loggedIn && (<Button color="inherit" onClick={() => logout()}>Odhlásit</Button>)}
        </Toolbar>
      </AppBar>
    )
  }

  toggleMenuBar() {
    const {menuBarOpen, open, close} = this.props
    const action = menuBarOpen ? close : open
    action()
  }
}
