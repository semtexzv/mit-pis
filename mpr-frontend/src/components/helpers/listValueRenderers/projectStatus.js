import React from 'react'
import {projectStates} from 'config'
import cls from 'layout.less'
import ActiveIcon from '@material-ui/icons/Done'
import WaitingIcon from '@material-ui/icons/Pause'
import DeletedIcon from '@material-ui/icons/Clear'
import ArchivedIcon from '@material-ui/icons/Archive'
import PlayArrow from '@material-ui/icons/PlayArrow'

const icons = {
  ACTIVE: PlayArrow,
  FINISHED: ActiveIcon,
  ARCHIVED: ArchivedIcon,
  WAITING: WaitingIcon,
  DELETED: DeletedIcon
}

export default (value, row, column) => {
  if (projectStates[value] === 'undefined') return ''
  const title = projectStates[value]
  const c = cls.status + ' ' + cls['status-' + value]
  if (typeof icons[value] === 'undefined') return ''
  const Icon = icons[value]
  return (
    <div className={c} title={title}>
      <Icon className={cls.icon} />
    </div>
  )
}
