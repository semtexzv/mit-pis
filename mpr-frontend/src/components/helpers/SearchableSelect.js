import React, { PureComponent } from 'react'
import cls from 'layout.less'
import InputLabel from 'material-ui/Input/InputLabel'
import FormControl from 'material-ui/Form/FormControl'
import FormHelperText from 'material-ui/Form/FormHelperText'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default class SearchableSelect extends PureComponent {
  render() {
    const {name, value, options, label, helperText, changeHandler} = this.props
    let labelProps = {}
    if (value) {
      labelProps.shrink = true
    }
    return (
      <FormControl className={cls.formControl + ' ' + cls.selectField}>
        <InputLabel htmlFor={name} className={cls.inputLabel} {...labelProps}>{label}</InputLabel>
        <Select
          className={cls.select}
          name={name}
          value={value}
          options={options}
          placeholder=''
          noResultsText={false}
          onChange={changeHandler}
        />
        {helperText && <FormHelperText className={cls.helperText}>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
}
