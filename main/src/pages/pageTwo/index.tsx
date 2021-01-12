import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import xml2js from 'xml2js'

import { AbstractComponent } from '../../module/AbstractComponent'
import { LOADING_STATE } from '../../store/activeTypes'
import { ICombinedState } from '../../store/reducers'
import { ILoadingState, IOptions } from '../../store/reducers/loadingStateRedc'

import { echartGraph } from '../../api/echartApi'
import { InitEchartContext, InterInitEchartContxt } from '../../module/echarts'

interface IPageTwoProps extends RouteComponentProps {
  setLoadingState: (loadingInfo: IOptions) => void
}

interface IPageTwoState {}

class PageTwo extends AbstractComponent<IPageTwoProps, IPageTwoState> {
  static contextType = InitEchartContext
  context!: InterInitEchartContxt;

  componentDidMount() {
    echartGraph<Buffer>().then(res => {
      const parser = new xml2js.Parser({ trim: true, explicitArray: true })
      parser.parseString(res, (_err: any, data: any) => {
        this.context.initEchart('graph', this.context.graphOptionsFormat(data))
      })
    })
  }
  render() {
    return (
      <div>
        <div id='graph' style={{ height: 500 }} />
      </div>
    )
  }
}

const mapStateToProps = (state: ICombinedState): ILoadingState => state.loadingStore
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setLoadingState: (loadingInfo: IOptions) => dispatch({ type: LOADING_STATE, payload: loadingInfo })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PageTwo))
