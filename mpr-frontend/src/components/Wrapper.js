import React, { PureComponent } from 'react'
import cls from 'layout.less'
import Paper from 'material-ui/Paper'
import Header from 'containers/common/Header'
import MenuBar from 'containers/common/MenuBar'

export default class Wrapper extends PureComponent {
  render() {
    return (
      <Paper className={cls.app} square elevation={0}>
        <Header />
        <MenuBar />
        {this.props.children}
      </Paper>
    )
  }
}
