import React, { PureComponent } from 'react'
import cls from 'layout.less'

export default class PageContent extends PureComponent {
  render() {
    const { title, className } = this.props
    const c = cls.content + ' ' + (className || '')
    return (
      <div className={c}>
        {title && (<h3 className={cls.title}>{title}</h3>)}
        {this.props.children}
        <div className={cls.clearfix} />
      </div>
    )
  }
}
