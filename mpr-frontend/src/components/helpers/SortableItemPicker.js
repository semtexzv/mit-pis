import React, { PureComponent } from 'react'
import cls from 'layout.less'
import SearchableSelect from './SearchableSelect'
import SortableItemPickerItem from './SortableItemPickerItem'
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import List, {
  ListItemIcon,
  ListItemSecondaryAction
} from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import DeleteIcon from '@material-ui/icons/Delete'
import pullAt from 'lodash/pullAt'
import cloneDeep from 'lodash/cloneDeep'

/**
* items prop can be either an array of IDs ([1, 2, 3]) or an array of objects with id parameter ([{id: 1, ...}, {id: 2, ...}])
*/

export default class SortableItemPicker extends PureComponent {
  optionsById = {}

  render() {
    /* DEV */console.time('SortableItemPicker->render()')/* /DEV */
    const { selectLabel, uniqueIDs, selectHelperText } = this.props
    const selectProps = {
      value: null,
      name: 'SortableItemPickerSelect',
      options: this.getOptions(uniqueIDs),
      label: selectLabel || 'Výběr položek',
      helperText: selectHelperText || '',
      changeHandler: item => this.updateItems([...this.props.items, item.value])
    }
    const SortableList = this.createList()
    return (
      <div className={cls.sortableItemPicker}>
        <SearchableSelect {...selectProps} />
        <SortableList items={this.props.items} onSortEnd={::this.onSortEnd} useDragHandle lockAxis='y' />
      </div>
    )
  }

  createList() {
    const SortableItem = this.createItem()
    return SortableContainer(({items}) => {
      return (
        <List dense className={cls.sortableList}>
          {items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} sortIndex={index} />
          ))}
        </List>
      )
    })
  }

  createItem() {
    const DragHandle = this.createDragHandle()
    const RemoveHandle = this.createRemoveHandle()
    const ItemComponent = this.props.customItemComponent || SortableItemPickerItem
    return SortableElement(({value, sortIndex}) => {
      const props = {
        DragHandle,
        RemoveHandle,
        value,
        sortIndex,
        label: this.getLabel(value),
        onChange: item => this.updateItem(sortIndex, item)
      }
      return (
        <div className={cls.sortableItem}>
          <ItemComponent {...props} />
        </div>
      )
    })
  }

  createDragHandle() {
    return SortableHandle(() => {
      return (
        <ListItemIcon className={cls.sortIcon} style={{'float': 'left'}}>
          <MenuIcon />
        </ListItemIcon>
      )
    })
  }

  createRemoveHandle() {
    const removeItem = ::this.removeItem
    return ({sortIndex}) => {
      return (
        <ListItemSecondaryAction>
          <IconButton className={cls.deleteIcon} aria-label="Odstranit" onClick={e => removeItem(sortIndex)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )
    }
  }

  updateItem(sortIndex, item) {
    const { onUpdate } = this.props
    const newItems = cloneDeep(this.props.items)
    newItems[sortIndex] = item
    onUpdate(newItems)
  }

  updateItems(items) {
    const { onUpdate } = this.props
    onUpdate(items)
  }

  onSortEnd({oldIndex, newIndex}) {
    this.updateItems(arrayMove(this.props.items, oldIndex, newIndex))
  }

  removeItem(index) {
    let newItems = cloneDeep(this.props.items)
    pullAt(newItems, [index])
    this.updateItems(newItems)
  }

  getOptions(unique = false) {
    const { options, items } = this.props
    if (!options) return []
    const itemIds = items.reduce((res, val) => { res.push(val.id ? val.id : val); return res }, [])
    const filteredOptions = !unique ? options : options.slice().reduce((res, val) => {
      if (itemIds.indexOf(val.value.id ? val.value.id : val.value) < 0) {
        res.push(val)
      }
      return res
    }, [])
    this.optionsById = options.reduce((res, val) => { res[val.value.id ? val.value.id : val.value] = val.label; return res }, {})
    return filteredOptions
  }

  getLabel(value) {
    return this.optionsById[value.id ? value.id : value] || ''
  }

  componentDidMount() {
    /* DEV */console.timeEnd('SortableItemPicker->render()')/* /DEV */
  }

  componentDidUpdate() {
    /* DEV */console.timeEnd('SortableItemPicker->render()')/* /DEV */
  }
}
