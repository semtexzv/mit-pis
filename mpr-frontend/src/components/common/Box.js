import React, { PureComponent } from 'react'
import cls from 'layout.less'
import Paper from 'material-ui/Paper'

export default class Box extends PureComponent {
  render() {
    const { title, className } = this.props
    const c = cls.box + ' ' + (className || '')
    return (
      <Paper className={c} square elevation={2}>
        {title && (<h4 className={cls.title}>{title}</h4>)}
        {this.props.children}
      </Paper>
    )
  }
}
