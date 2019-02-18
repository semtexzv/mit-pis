import React from 'react'
import cls from 'layout.less'
import ActiveIcon from '@material-ui/icons/Done'
import InactiveIcon from '@material-ui/icons/Clear'

export default (value, row, column) => {
  const active = !!value
  const c = cls.status + ' ' + cls['status-' + (active ? 'A' : 'D')]
  const Icon = active ? ActiveIcon : InactiveIcon
  return (
    <div className={c}>
      <Icon className={cls.icon} />
    </div>
  )
}
