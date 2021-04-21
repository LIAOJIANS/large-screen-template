import React from 'react'

import Cookie from 'js-cookie'
import Message, { InterMessagesProps } from '../components/messages/messages'

export interface IOptions {
  msg: any,
  isShowLoading: boolean
}

export interface InterAbstractComponent {
  closeLoadingShow?: () => void
  setLoadingState?: (loadingInfo: IOptions) => void
  message?: (options: InterMessagesProps) => void

  setToken?: (token: string) => void
  getToken?: () => string

  tableOneFormat?: (data: []) => []
}

export class AbstractComponent<
  P extends InterAbstractComponent,
  S,
  SS = any
> extends React.PureComponent<P, S, SS> {
  private USER_TOKEN = 'USER_TOKEN'

  message(options: InterMessagesProps) {
    // eslint-disable-next-line no-new
    new Message(options)
  }

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

  tableOneFormat(data: []) {
    let newData: Array<Array<any>> = []
    data.forEach((c, i) => {
      const newDataChild: [] = []
      Object.keys(c).forEach(r => {
        newDataChild.push(c[r])
        newData = [
          ...newData,
          newDataChild
        ]
      })
    })
    return newData
  }
}
