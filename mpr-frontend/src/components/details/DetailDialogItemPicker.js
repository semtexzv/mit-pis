import React, { Component } from 'react'
import SortableItemPicker from 'components/helpers/SortableItemPicker'

export default class DetailDialogItemPicker extends Component {
  render() {
    const { selectLabel, getOptions, formValues, formValueKey, customItemComponent, uniqueIDs } = this.props
    const items = formValues[formValueKey] || []
    const options = getOptions(formValues)
    const onUpdate = ::this.onUpdate

    const pickerProps = {selectLabel, options, items, onUpdate, customItemComponent, uniqueIDs: uniqueIDs === true}
    return (
      <SortableItemPicker {...pickerProps} />
    )
  }

  onUpdate(items) {
    const { formValueKey, onFormChange } = this.props
    onFormChange(formValueKey, items)
  }
}
