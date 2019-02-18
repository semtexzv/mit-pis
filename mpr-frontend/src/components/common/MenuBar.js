import React, { PureComponent } from 'react'
import cls from 'layout.less'
import Drawer from 'material-ui/Drawer'
// import Button from 'material-ui/Button'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
// import Divider from 'material-ui/Divider'
import {dockedMenuBarTheshold} from 'config'

export default class MenuBar extends PureComponent {
  onResize() {
    this.checkMenuBarDocking()
  }

  checkMenuBarDocking() {
    const {menuBarDocked, menuBarOpen} = this.props
    if (window.innerWidth >= dockedMenuBarTheshold && !menuBarDocked && !this.docking) {
      this.props.dock()
      if (!menuBarOpen) {
        this.props.open()
      }
    } else if (window.innerWidth < dockedMenuBarTheshold && menuBarDocked && !this.undocking) {
      if (menuBarOpen) {
        this.props.close()
      }
      this.props.undock()
    }
  }

  componentWillMount() {
    window.addEventListener('resize', ::this.onResize, true)
  }

  componentWillUnmount() {
    window.addEventListener('resize', ::this.onResize, true)
  }

  render() {
    const {menuBarDocked, menuBarOpen} = this.props

    return (
      <Drawer
        open={menuBarOpen}
        variant={menuBarDocked ? 'persistent' : 'temporary'}
        className={cls.menuBar}
        onClose={() => this.props.close()}
      >
        {this.renderMenu()}
      </Drawer>
    )
  }

  renderMenu() {
    const {getMenu} = this.props
    const menu = getMenu(this.props)
    return (
      <div>
        <List disablePadding>
          {menu.map((item, index) => {
            const c = cls.menuItem + (item.selected ? ' ' + cls.active : '')
            return (
              <ListItem button onClick={item.action} key={index} className={c} >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText className={cls.menuItemLabel} primary={item.text} />
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}
