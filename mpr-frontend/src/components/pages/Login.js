import React, {PureComponent} from 'react'
import PageWrapper from 'containers/common/PageWrapper'
import cls from 'layout.less'
import * as tools from 'lib/tools'
import Paper from 'material-ui/Paper'
import LoaderButton from 'components/helpers/LoaderButton'
import {FormControlLabel} from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import LoginIcon from '@material-ui/icons/Person'
import PasswordIcon from '@material-ui/icons/Lock'

export default class Login extends PureComponent {
  state = {
    login: '',
    password: '',
    remember: false
  };

  handleLoginChange(login) {
    this.setState({login})
  }

  handlePasswordChange(password) {
    this.setState({password})
  }

  handleRememberToggle(remember) {
    this.setState({remember})
  }

  handleSubmit(e) {
    if (this.state.loggingIn) return
    e.preventDefault()
    var login = this.state.login.trim()
    var password = this.state.password.trim()
    var remember = this.state.remember
    if (!login || !password) {
      tools.showError('Vyplňte prosím uživatelské jméno i heslo')
      return
    }
    this.props.auth(login, password, remember)
  }

  render() {
    const {syncingAuth, syncingProfile} = this.props
    const sync = syncingAuth || syncingProfile
    const buttonLabel = sync ? syncingAuth ? 'Přihlašuji' : 'Načítám profil' : 'Vstoupit'

    return (
      <PageWrapper title="Login" heading="Vstup do systému" extraClassName={cls.login}>
        <Paper className={cls.loginBox} square elevation={6}>
          <TextField fullWidth className={cls.textField} name="login" type="text" label={(<span className={cls.label}><LoginIcon /> Uživatel</span>)}
            onChange={(e) => this.handleLoginChange(e.target.value)}
            value={this.state.login}
          />
          <TextField fullWidth className={cls.textField} name="password" type="password" label={(<span className={cls.label}><PasswordIcon /> Heslo</span>)}
            onChange={(e) => this.handlePasswordChange(e.target.value)}
            value={this.state.password}
          />
          <FormControlLabel className={cls.checkBoxLabel} label="Zůstat přihlášen" control={
            <Checkbox color="default" value="1" checked={this.state.remember}
              className={cls.checkBox} name="remember"
              onChange={(e, val) => this.handleRememberToggle(val)}
            />
          } />
          <LoaderButton loading={sync} className={cls.loginButton} onClick={::this.handleSubmit} color="secondary" variant="raised" label={buttonLabel} />
        </Paper>
      </PageWrapper>
    )
  }
}
