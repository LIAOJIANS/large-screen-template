import React from 'react'
// import { InterInitEchartContxt } from './echarts'
// import { LoadingContext, ILodingView } from './loading'

export interface IOptions {
  msg: any,
  isShowLoading: boolean
}

export class AbstractComponent<
  P,
  S,
  SS = any
> extends React.PureComponent<P, S, SS> {
  // static contextType = LoadingContext
  // context!: InterInitEchartContxt

  showLoading(options: IOptions) {

  }
}
