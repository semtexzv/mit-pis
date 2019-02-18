import React, { PureComponent } from 'react'
import cls from 'layout.less'
import {
  ListItem,
  ListItemText
} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import cloneDeep from 'lodash/cloneDeep'

export default class DetailDialogRoleRequirementPickerItem extends PureComponent {
  render() {
    const { DragHandle, RemoveHandle, value, sortIndex, getQualification } = this.props
    const qual = getQualification(value.id || value.qualId)
    if (!qual) {
      return (<div style={{color: 'white'}}>Načítám ...</div>)
    }
    return (
      <ListItem className={cls.listItem} divider style={{flexWrap: 'wrap'}}>
        <div style={{'flex': '0 0 100%'}}>
          <DragHandle />
          <ListItemText className={cls.text} primary={`${qual.name} (${qual.description})`} />
          <RemoveHandle sortIndex={sortIndex} />
        </div>
        <div style={{'flex': '1 1 100%'}}>
          <TextField key={'level'}
            value={value.level}
            label="Požadovaná úroveň"
            numeric="true"
            style={{margin: '10px 0px'}}
            onChange={e => this.onChange('level', parseFloat(e.target.value))}
          />
        </div>
      </ListItem>
    )
  }

  onChange(param, val) {
    const { value, onChange } = this.props
    const newValue = cloneDeep(value)
    newValue[param] = val
    onChange(newValue)
  }
}
