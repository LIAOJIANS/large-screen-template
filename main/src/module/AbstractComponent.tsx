import React from 'react'
// import { InterInitEchartContxt } from './echarts'
// import { LoadingContext, ILodingView } from './loading'

export interface IOptions {
  msg: any,
  isShowLoading: boolean
}

export class AbstractComponent<
  P extends {
    setLoadingState: (loadingInfo: IOptions) => void
  },
  S,
  SS = any
> extends React.PureComponent<P, S, SS> {
  closeLoadingShow() {
    this.props.setLoadingState({ msg: '', isShowLoading: false })
  }
}
