import React, { PureComponent } from 'react'
import cls from 'layout.less'
import {
  ListItem,
  ListItemText
} from 'material-ui/List'
import cloneDeep from 'lodash/cloneDeep'
import {FormControlLabel} from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import pullAt from 'lodash/pullAt'

export default class DetailDialogProjectParticipantPickerItem extends PureComponent {
  render() {
    const { DragHandle, RemoveHandle, value, label, sortIndex, getPerson, getRoles, projectId } = this.props
    const person = getPerson(value.id)
    const roles = getRoles(projectId)
    if (!person || !roles) {
      return (<div style={{color: 'white'}}>Načítám ...</div>)
    }
    const { roleIds } = value
    return (
      <ListItem className={cls.listItem} divider style={{flexWrap: 'wrap'}}>
        <div style={{'flex': '0 0 100%'}}>
          <DragHandle />
          <ListItemText className={cls.text} primary={label} />
          <RemoveHandle sortIndex={sortIndex} />
        </div>
        <div style={{'flex': '1 1 100%', padding: '10px 0px'}}>
          {roles.map((role, i) => {
            const active = roleIds.indexOf(role.id) > -1
            return (
              <FormControlLabel key={i} className={cls.checkboxLabel} label={role.name} control={
                <Checkbox color="default" checked={active} onChange={(e, checked) => this.toggleRole(role, checked)} />
              } />
            )
          })}
        </div>
      </ListItem>
    )
  }

  toggleRole(role, checked) {
    const { value } = this.props
    const { id } = role
    let roleIds = value.roleIds.slice(0)
    if (checked && roleIds.indexOf(id) < 0) {
      this.onChange('roleIds', [...roleIds, id])
    } else if (!checked && roleIds.indexOf(id) > -1) {
      pullAt(roleIds, [roleIds.indexOf(id)])
      this.onChange('roleIds', roleIds)
    } else {
      return
    }
  }

  onChange(param, val) {
    const { value, onChange } = this.props
    const newValue = cloneDeep(value)
    newValue[param] = val
    onChange(newValue)
  }
}
