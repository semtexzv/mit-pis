import React, { PureComponent } from 'react'
import cls from 'layout.less'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import LoaderButton from 'components/helpers/LoaderButton'

export default class ConfirmationDialog extends PureComponent {
  handleDismiss() {
    this.props.dismiss(this.state, this.props)
  }
  handleConfirm() {
    this.props.confirm(this.state, this.props)
  }

  render() {
    /* DEV */console.time('ConfirmationDialog->render()')/* /DEV */
    const { open, body } = this.props
    if (!open) return null
    const title = this.props.title || 'Odstranit tuto položku?'
    const c = cls.dialog + ' ' + cls.confirmationDialog

    return (
      <Dialog maxWidth='sm' className={c} open={open} onClose={::this.handleDismiss}>
        <DialogTitle className={cls.dialogTitle}>
          {title}
        </DialogTitle>
        {body && (
          <DialogContent className={cls.dialogContent}>
            {body}
          </DialogContent>
        )}
        <DialogActions className={cls.dialogActions}>
          {this.renderActions()}
        </DialogActions>
      </Dialog>
    )
  }

  renderActions() {
    const dismissButtonTitle = this.props.dismissButtonTitle || 'Zpět'
    const confirmButtonTitle = this.props.confirmButtonTitle || 'Odstranit'
    const confirmButtonColor = this.props.confirmButtonColor || 'secondary'
    const loading = this.props.loading || false
    return (
      <div>
        <Button className={cls.dialogActionClose} onClick={::this.handleDismiss} color="primary" variant="raised">
          {dismissButtonTitle}
        </Button>
        <LoaderButton loading={loading} className={cls.dialogActionConfirm} onClick={::this.handleConfirm} color={confirmButtonColor} variant="raised" label={confirmButtonTitle} />
      </div>
    )
  }

  /* DEV */
  componentDidMount() {
    console.timeEnd('ConfirmationDialog->render()')
  }
  componentDidUpdate() {
    console.timeEnd('ConfirmationDialog->render()')
  }
  /* /DEV */
}
