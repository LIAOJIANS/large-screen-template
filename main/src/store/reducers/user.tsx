import { AnyAction } from 'redux'
import { createBrowserHistory } from 'history'

import Cookie from 'js-cookie'
import {
  SET_TOKEN,
  SET_USERINFO,
  LOGOUT
} from '../activeTypes'
import {
  InterUser
} from '../model/IUser'

const initialState: InterUser = {
  userInfo: {},
  token: ''
}

export default (state: InterUser = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token }
    case SET_USERINFO:
      // eslint-disable-next-line no-case-declarations
      const token = Cookie.get('USER_TOKEN') as string
      // eslint-disable-next-line no-case-declarations
      const obj = {
        userInfo: { ...state.userInfo, ...action.userInfo },
        token
      }
      return { ...state, ...obj }
    case LOGOUT:
      Cookie.remove('USER_TOKEN')
      createBrowserHistory().replace('/login')
      return { ...state, token: '' }
    default:
      return state
  }
}
