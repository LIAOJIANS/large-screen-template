import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'
import { AbstractComponent, IOptions } from '../../module/AbstractComponent'
import { InterUser } from '../../store/model/IUser'
import { ICombinedState } from '../../store/reducers'

import './login.scss'
import {
  login
} from '../../api/userApi'
import { enumMessageType } from '../../components/messages/messages'

import { Dispatch } from 'redux'
import { LOADING_STATE, SET_TOKEN } from '../../store/activeTypes'

interface InterLoginProps extends RouteComponentProps {
  setLoadingState: (loadingInfo: IOptions) => void
  token: string
  setToken: (token: string) => void
  [key:string]:any
}

class Login extends AbstractComponent<InterLoginProps, {
  username: string,
  password: string
}> {
  state = {
    username: '',
    password: ''
  }

  subLoginForm() {
    const { username, password } = this.state
    this.props.setLoadingState({ msg: '登录中...', isShowLoading: true })
    login<{ token: string }>(username, password)?.then(res => {
      this.message({
        title: '登录成功！',
        type: enumMessageType.SUCCESS
      })
      this.closeLoadingShow()
      this.setToken(res.token)
      this.props.setToken(res.token)
      this.props.history.replace('/page-one')
    }).catch(e => this.closeLoadingShow())
  }

  render() {
    return (
      <div className='login'>
        <p className='login_title'>大屏模板登录</p>
        <div className='login_body'>

          <div>
            <p className='login_form_title'>用户名：</p>
            <input type='text' onChange={ e => this.setState({ username: e.target.value }) }/>
          </div>

          <div>
            <p className='login_form_title'>密码：</p>
            <input type='password' onChange={ e => this.setState({ password: e.target.value }) } onKeyDown={e => e.key === 'Enter' && this.subLoginForm() } />
          </div>

          <button onClick={ () => this.subLoginForm() }>登录</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: ICombinedState): InterUser => state.user

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setToken: (token: string) => dispatch({ type: SET_TOKEN, token }),
  setLoadingState: (loadingInfo: IOptions) => dispatch({ type: LOADING_STATE, payload: loadingInfo })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
