import React from 'react'

export interface IOptions {
  msg: any,
  isShowLoading: boolean
}

export interface IUniversalContext {
  store: IOptions
  loadShow: (options: IOptions) => void
}

export class Universal implements IUniversalContext {
  store = {
    msg: '21321',
    isShowLoading: false
  }

  loadShow(options: IOptions) {
    this.store = { ...this.store, ...options }
  }
}

export const UniversalContext = React.createContext<IUniversalContext>(null as any)
