import React, { Component } from 'react'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'
import cls from 'layout.less'
import {detailActions} from 'definitions'
import {frontendLanguages} from 'config'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import LoaderButton from 'components/helpers/LoaderButton'
import 'react-select/dist/react-select.css'
import * as tools from 'lib/tools'

export default class DetailDialog extends Component {
  changed = false
  state = {
    values: null,
    tabIndex: 0
  }

  handleClose() {
    const tabNumber = Object.keys(this.props.getTabs(this.state, this.props)).length
    if (!this.changed && tabNumber < 2) {
      this.handleDismiss()
    }
  }
  handleDismiss() {
    this.props.dismiss(this.state, this.props)
  }
  handleConfirm() {
    const valid = this.validate()
    if (valid) {
      this.props.confirm(this.state, this.props)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
  }

  componentWillMount() {
    this.prefillValuesIntoState()
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.prefillValuesIntoState(nextProps)
  }

  prefillValuesIntoState(nextProps = {}) {
    const {getData, dataVersion} = this.props
    const action = nextProps.action || this.props.action
    const id = nextProps.id || this.props.id
    if (action === detailActions.CREATE) {
      if (!this.state.values || this.state.values && this.state.values.id > 0) {
        this.changed = false
        this.setState({values: this.getCreationDefaultValues()})
      }
    } else if (action === detailActions.EDIT && id && (!this.state.values || (id !== this.props.id || dataVersion < nextProps.dataVersion))) {
      // if detail for another ID, or detail data got downloaded
      const props = Object.keys(nextProps).length > 0 ? nextProps : this.props
      const values = getData(this.state, props, id)
      this.changed = false
      if (values !== null && values._incomplete !== true) {
        this.setState({values: cloneDeep(values)})
      } else {
        this.setState({values: {}})
      }
    } else if (action === detailActions.NONE && this.state.values) {
      this.setState({values: null})
      this.changed = false
    }
  }

  onChange(name, value, push = false) {
    let values = cloneDeep(this.state.values)
    if (push) {
      if (typeof values[name] === 'undefined') {
        values[name] = [value]
      } else {
        values[name].push(value)
      }
    } else {
      values[name] = value
    }
    this.changed = true
    this.setState({values})
  }

  render() {
    /* DEV */console.time('DetailDialog->render()')/* /DEV */
    const { open } = this.props
    if (!open) return null
    const title = this.props.title || 'Detail položky'
    const c = cls.dialog + ' ' + cls.detailDialog

    return (
      <Dialog maxWidth='md' className={c} open={open} onClose={::this.handleClose}>
        <DialogTitle className={cls.dialogTitle}>
          {title}
        </DialogTitle>
        <DialogContent className={cls.dialogContent}>
          {this.renderTabMenu()}
          {this.renderContent()}
        </DialogContent>
        <DialogActions className={cls.dialogActions}>
          {this.renderActions()}
        </DialogActions>
      </Dialog>
    )
  }

  renderTabMenu() {
    const tabs = this.props.getTabs(this.state, this.props)
    if (Object.keys(tabs).length < 2) return null
    return (
      <AppBar position="static" className={cls.tabMenu}>
        <Tabs
          value={this.state.tabIndex}
          onChange={(e, index) => this.setTab(index)}
          indicatorColor="secondary"
          textColor="secondary"
          scrollable
          scrollButtons="auto"
          fullWidth
        >
          {Object.keys(tabs).map(label => (
            <Tab label={label} key={label} className={cls.tabItem} />
          ))}
        </Tabs>
      </AppBar>
    )
  }

  renderContent() {
    const tabs = this.props.getTabs(this.state, this.props)
    const activeTab = Object.keys(tabs)[this.state.tabIndex]
    const formDefinitons = this.getFormDefinitons()
    const TabContentComponent = tabs[activeTab]
    return (
      <div className={cls.tabContainer}>
        <TabContentComponent formDefinitons={formDefinitons} onFormChange={::this.onChange} formValues={this.state.values} {...this.props} />
      </div>
    )
  }

  setTab(tabIndex) {
    this.setState({tabIndex})
  }

  renderActions() {
    const dismissButtonTitle = this.props.dismissButtonTitle || 'Zavřít'
    const confirmButtonTitle = this.props.confirmButtonTitle || 'Uložit'
    const loading = this.props.loading || false
    return (
      <div>
        <Button className={cls.dialogActionClose} onClick={::this.handleDismiss} color="primary" variant="raised">
          {dismissButtonTitle}
        </Button>
        <LoaderButton loading={loading} className={cls.dialogActionSave} onClick={::this.handleConfirm} color="secondary" variant="raised" label={confirmButtonTitle} />
      </div>
    )
  }

  validate() {
    const { values } = this.state
    const definitions = this.getFormDefinitons()
    let valid = true
    definitions.forEach((def) => {
      if (def.required && !values[def.name]) {
        tools.showError('Vyplňte prosím pole ' + def.label)
        valid = false
      }
    })
    return valid
  }

  getFormDefinitons() {
    const {getFormDefinitons, language} = this.props
    let definitions = cloneDeep(getFormDefinitons(this.state, this.props))
    // internationalize columns, if translations are on
    for (let i in definitions) {
      if (definitions[i].translation) {
        definitions[i].name += '_' + language
        definitions[i].label += ' (' + frontendLanguages[language] + ')'
      }
    }
    return definitions
  }

  getCreationDefaultValues() {
    let values = {}
    const definitions = this.getFormDefinitons()
    for (let i in definitions) {
      if (typeof definitions[i].defaultValue !== 'undefined') {
        values[definitions[i].name] = definitions[i].defaultValue
      }
    }
    return values
  }

  componentDidMount() {
    this.fixTabIndex()
    /* DEV */console.timeEnd('DetailDialog->render()')/* /DEV */
  }
  componentDidUpdate() {
    this.fixTabIndex()
    /* DEV */console.timeEnd('DetailDialog->render()')/* /DEV */
  }

  /**
  * maybe will get unneeded with next version of MUI, without this, tinyMCE dialogs do not work
  */
  fixTabIndex() {
    const c = cls.detailDialog
    const rootElems = document.getElementsByClassName(c) // dialog element
    if (!rootElems || !rootElems.length) return
    const rootElem = rootElems[0]
    if (!rootElem.childNodes || rootElem.childNodes.length < 2) return
    const elem = rootElem.childNodes[1] // dialog child element (Paper)
    elem.removeAttribute('tabindex')
  }
}
