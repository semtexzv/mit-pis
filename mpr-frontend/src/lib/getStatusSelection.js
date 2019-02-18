import {states} from 'config'

export default () =>
  Object.keys(states).map(value => ({
    value,
    label: states[value]
  }))
