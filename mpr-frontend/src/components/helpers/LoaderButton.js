import React, {PureComponent} from 'react'
import cls from 'layout.less'
import Button from 'material-ui/Button'
import { CircularProgress } from 'material-ui/Progress'

/**
* extends MUI button
* extra params: loading (bool), label (string)
*/
export default class LoaderButton extends PureComponent {
  render() {
    const {loading, className, label, icon = null, ...otherProps} = this.props
    const c = className + ' ' + cls.loaderButton

    return (
      <Button disabled={loading} className={c} {...otherProps}>
        {loading && (
          <span className={cls.loaderButtonInner}>
            <CircularProgress size={20} className={cls.loader} />
          </span>
        )}
        {!loading && icon}
        {label}
      </Button>
    )
  }
}
