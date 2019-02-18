import React, { PureComponent } from 'react'
import Dropzone from 'react-dropzone'
import cls from 'layout.less'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

export default class ImageField extends PureComponent {
  render() {
    const { label, value, className, helperText } = this.props
    const c = cls.imageField + ' ' + (className || '')
    const showImage = !!value
    const imageClass = value ? cls.image + ' ' + cls.full : cls.image + ' ' + cls.empty
    return (
      <Dropzone className={c} multiple={false} onDrop={::this.handleUpload} accept="image/jpeg, image/png, image/gif, image/bmp">
        {({ isDragActive, isDragReject }) => {
          const cl = cls.card + (isDragActive ? ' ' + cls.dropActive : '') + (isDragReject ? ' ' + cls.dropReject : '')
          return (
            <Card className={cl}>
              {showImage && <CardMedia className={imageClass} image={value} />}
              <CardContent className={cls.content} onClick={::this.takeNoAction}>
                <Typography variant="subheading">
                  {isDragActive ? 'Uvolněním nahrajete ...' : label}
                </Typography>
                {helperText && (
                  <Typography variant="caption">
                    {helperText}
                  </Typography>
                )}
              </CardContent>
              <CardActions className={cls.actions}>
                {value && (
                  <Button size="small" color="primary" variant="raised" onClick={::this.handleRemove}>
                    Odstranit
                  </Button>
                )}
                <Button size="small" color="secondary" variant="raised">
                  {value ? 'Nahrát jiný' : 'Nahrát'}
                </Button>
              </CardActions>
            </Card>
          )
        }}
      </Dropzone>
    )
  }

  takeNoAction(e) {
    e.stopPropagation()
    e.preventDefault()
  }

  handleRemove(e) {
    const { resetHandler } = this.props
    e.stopPropagation()
    e.preventDefault()
    resetHandler()
  }

  handleUpload(files) {
    if (!files || !files.length) return
    const file = files[0]
    const { uploadHandler } = this.props
    uploadHandler(file)
  }
}
