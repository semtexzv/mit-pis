import React, { Component } from 'react'
import assign from 'lodash/assign'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import cls from 'layout.less'
import {detailActions} from 'definitions'
import {FormControlLabel} from 'material-ui/Form'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Loader from 'components/helpers/Loader'
import ImageField from 'components/helpers/ImageField'
import SearchableSelect from 'components/helpers/SearchableSelect'
import moment from 'moment'
import 'moment/locale/cs'
import DatePicker from 'material-ui-pickers/DatePicker'

export default class DetailDialogForm extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props)
  }

  render() {
    return (
      <div className={cls.dialogForm}>
        {this.renderFormItems()}
      </div>
    )
  }

  renderFormItems() {
    const { formValues, action, onFormChange, formDefinitons } = this.props
    if (action === detailActions.EDIT &&
      (formValues === null || !Object.keys(formValues).length || formValues._incomplete === true)
    ) {
      return (
        <Loader />
      )
    }
    return formDefinitons.map((def, index) => {
      const vars = pick(def, ['fullwidth', 'translation', 'nl2br'])
      const c = cls.formField + ' formField-' + def.name + ' ' + (vars.fullwidth ? cls.fullwidth : '')
      const name = def.name
      let value = typeof formValues[name] === 'undefined' || formValues[name] === null ? '' : formValues[name]
      value = this.parseValue(value, def)
      let props = assign(omit(def, ['fullwidth', 'translation', 'nl2br']), {id: def.name, key: name, value, className: c})
      switch (def.type) {
        case 'checkbox':
          value = !!value
          props.checked = value
          props.value = props.name
          props.className = cls.checkbox
          const control = (
            <Checkbox
              onChange={(e, val) => onFormChange(name, val)}
              color="default"
              {...props}
            />
          )
          return (
            <FormControlLabel
              key={name}
              className={props.labelClassName}
              value="male"
              control={control}
              label={props.label}
            />
          )
        case 'image':
          return (
            <ImageField
              key={name}
              label={props.label}
              value={value}
              uploadHandler={file => props.onUpload(file, onFormChange)}
              resetHandler={file => onFormChange(name, '')}
            />
          )
        case 'select':
          const selectProps = {
            value,
            name,
            options: props.options,
            label: props.label,
            helperText: props.helperText,
            changeHandler: item => onFormChange(name, item ? item.value : null)
          }
          return (<SearchableSelect key={name} {...selectProps} />)
        case 'date':
          if (typeof value === 'object' && value && typeof value[6] !== 'undefined') {
            // fix time format from api
            value[6] = 0
            value[1]--
          }
          const datepickerProps = {
            value,
            name,
            InputAdornmentProps: {helperText: props.helperText},
            label: props.label,
            format: props.format,
            maxDateMessage: 'Nelze nastavit budoucí datum',
            minDateMessage: 'Nelze nastavit minulé datum',
            className: cls.dateField,
            cancelLabel: 'Zrušit',
            clearLabel: 'Vymazat datum',
            emptyLabel: '',
            todayLabel: 'Dnes',
            invalidDateMessage: 'Neplatné datum',
            invalidLabel: 'Neplatné datum',
            disableFuture: props.disableFuture || false,
            disablePast: props.disablePast || false,
            clearable: true,
            animateYearScrolling: false,
            onChange: mom => onFormChange(name, mom.format('YYYY-MM-DD') + 'T00:00:00.000')
          }
          return (
            <DatePicker key={name} {...datepickerProps}/>
          )

        default:
          const onChangeFunction = vars.nl2br
            ? e => onFormChange(name, e.target.value.replace(/\r\n/g, '<br />').replace(/\n/g, '<br />'))
            : e => onFormChange(name, e.target.value)
          return (
            <TextField key={name}
              onChange={onChangeFunction}
              {...props}
            />
          )
      }
    })
  }

  parseValue(value, definition) {
    if (definition.type === 'date') {
      if (value && value.length && moment(value).isValid()) {
        value = moment(value).format('YYYY-MM-DD')
      } else {
        value = ''
      }
    }
    if (definition.nl2br) {
      value = value.replace(/<br \/>/g, '\n')
    }
    return value
  }
}
