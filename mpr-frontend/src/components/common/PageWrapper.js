import React, { PureComponent } from 'react'
import cls from 'layout.less'
import {setWindowTitlePart} from 'lib/tools'
import Paper from 'material-ui/Paper'

export default class PageWrapper extends PureComponent {
  render() {
    const {menuBarDocked, menuBarOpen, title, heading, extraClassName, fullpage} = this.props
    const withMenuBar = menuBarDocked && menuBarOpen
    const c = cls.page +
      (withMenuBar ? ' ' + cls.withMenuBar : '') +
      (fullpage ? ' ' + cls.fullpage : '') +
      (extraClassName ? ' ' + extraClassName : '')

    if (title) {
      setWindowTitlePart(title)
    }

    return (
      <Paper className={c} square elevation={1}>
        {heading ? (
          <h2 className={cls.title}>
            {heading}
          </h2>
        ) : null}
        {this.props.children}
        <div className={cls.clearfix} />
      </Paper>
    )
  }
}
