import React, { PureComponent } from 'react'
import cls from 'layout.less'
import {
  ListItem,
  ListItemText
} from 'material-ui/List'

export default class SortableItemPickerItem extends PureComponent {
  render() {
    const { DragHandle, RemoveHandle, /* value, onChange, */ label, sortIndex } = this.props
    return (
      <ListItem className={cls.listItem} divider>
        <DragHandle />
        <ListItemText className={cls.text} primary={label} />
        <RemoveHandle sortIndex={sortIndex} />
      </ListItem>
    )
  }
}
