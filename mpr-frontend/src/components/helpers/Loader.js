import React, { PureComponent } from 'react'
import {CircularProgress} from 'material-ui/Progress'
import cls from 'layout.less'

export default class Loader extends PureComponent {
  render() {
    const {size = 60} = this.props
    return (
      <div className={cls.loaderContainer}>
        <CircularProgress size={size} className={cls.loader} />
      </div>
    )
  }
}
