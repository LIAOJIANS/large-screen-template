import React from 'react'

import Cookie from 'js-cookie'

export interface IOptions {
  msg: any,
  isShowLoading: boolean
}

export interface InterAbstractComponent {
  closeLoadingShow?: () => void
  setLoadingState?: (loadingInfo: IOptions) => void,

  setToken?: (token: string) => void
  getToken?: () => string
}

export class AbstractComponent<
  P extends InterAbstractComponent,
  S,
  SS = any
> extends React.PureComponent<P, S, SS> {
  private USER_TOKEN = 'USER_TOKEN'

  closeLoadingShow() {
    this.props.setLoadingState?.({ msg: '', isShowLoading: false })
  }

  setToken(token: string) {
    Cookie.set(this.USER_TOKEN, token)
  }

  getToken() {
    return Cookie.get(this.USER_TOKEN)
  }

  removeToken() {
    return Cookie.remove(this.USER_TOKEN)
  }
}
