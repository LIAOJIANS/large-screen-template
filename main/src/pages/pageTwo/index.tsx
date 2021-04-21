import React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'
import xml2js from 'xml2js'
import {
  BorderBox7,
  CapsuleChart,
  ScrollBoard
} from '@jiaminghi/data-view-react'

import './pageTwo.scss'
import { AbstractComponent } from '../../module/AbstractComponent'
import { LOADING_STATE } from '../../store/activeTypes'
import { ICombinedState } from '../../store/reducers'
import { ILoadingState, IOptions } from '../../store/reducers/loadingStateRedc'

import { ITableConfig } from '../../common/model/ICommonTable'
import {
  addressRank,
  tableTow
} from '../../api/pageTwoApi'
import { echartGraph } from '../../api/echartApi'
import { InitEchartContext, InterInitEchartContxt } from '../../module/echarts'
import { IAddressRank, ICapsule, IProgress, ISquare } from './model'
import { IScrollRankingBoardData } from '../../common/model/ICommon'
import { Progress } from 'antd'

interface ISerialSortrProps {
  dataList: ICapsule | ISquare[] | IProgress[],
  showType: 'capsule' | 'square' | 'progress'
}

class SerialSortr extends React.Component<ISerialSortrProps, {}> {
  squareDom(dataList: ISquare[]) {
    return (
      dataList?.map((c, i) => (
        <div className='dispaly-center' key={ i } style={{ marginTop: 10 }}>
          <span className='serial_number'>{ i + 1 }</span>
          <p className='serial_content'>{ c.name }</p>
          <span>{ c.value }</span>
        </div>
      ))
    )
  }

  progressDom(dataList: IProgress[]) {
    return (
      dataList?.map((c, i) => (
        <div className='dispaly-center' key={ i } style={{ marginTop: 10, width: 230 }} >
          <span className='serial_number'>{ i + 1 }</span>
          <p style={{ whiteSpace: 'nowrap', margin: '0 15px' }}>{ c.name }</p>
          <Progress
            percent={ c.value }
            status='active'
            showInfo={ false }
            strokeColor={{
              '0%': '#14D9FC',
              '100%': '#6CFABE'
            }}
          />
          <span className='pl-1'>{ c.value }</span>
        </div>
      ))
    )
  }

  // eslint-disable-next-line no-undef
  renderDom(): JSX.Element[] | JSX.Element {
    // eslint-disable-next-line no-undef
    let dom: JSX.Element[] | JSX.Element = <div />
    const { dataList, showType } = this.props
    switch (showType) {
      case 'square':
        dom = this.squareDom?.(this.props.dataList as ISquare[])
        break
      case 'capsule':
        dom = <CapsuleChart
          config={ dataList }
          style={{ width: '300px', height: '170px' }}
        />
        break
      case 'progress':
        dom = this.progressDom?.(this.props.dataList as IProgress[])
        break
      default:
        break
    }
    return dom
  }

  render() {
    return (
      <div>
        { this.renderDom?.() }
      </div>
    )
  }
}

interface IPageTwoProps extends RouteComponentProps {
  setLoadingState: (loadingInfo: IOptions) => void
}

interface IPageTwoState {
  squareList: ISquare[],
  capsuleList: ICapsule,
  progressList: IProgress[],
  tableList: any[]
}

class PageTwo extends AbstractComponent<IPageTwoProps, IPageTwoState> {
  static contextType = InitEchartContext
  context!: InterInitEchartContxt;

  state = {
    squareList: [],
    capsuleList: {},
    progressList: [],
    tableList: []
  }

  async componentDidMount() {
    this.props.setLoadingState({ msg: '正在加载', isShowLoading: true })
    await echartGraph<Buffer>().then(res => {
      const parser = new xml2js.Parser({ trim: true, explicitArray: true })
      parser.parseString(res, (_err: any, data: any) => {
        this.context.initEchart('graph', this.context.graphOptionsFormat(data))
      })
    }).catch(() => this.closeLoadingShow())

    await tableTow<[]>().then(res => {
      this.setState({
        tableList: res
      })
    })

    await addressRank<IAddressRank>().then(res => {
      this.setState({
        squareList: res.square,
        capsuleList: this.capsuleDataFormat(res.capsule),
        progressList: res.progress
      })
      this.closeLoadingShow()
    }).catch(() => this.closeLoadingShow())
  }

  capsuleDataFormat(capsule: IScrollRankingBoardData[]): ICapsule {
    return {
      data: capsule,
      showValue: false
    }
  }

  render() {
    const tableConfig:ITableConfig = {
      header: ['列1', '列2', '列3', '列4'],
      data: this.tableOneFormat(this.state.tableList as []),
      index: true,
      indexHeader: '序号',
      evenRowBGC: '#10213f',
      rowNum: 10,
      headerBGC: '#20314c',
      columnWidth: [80, 140, 140, 140, 140],
      align: ['center', 'center', 'center', 'center', 'center'],
      oddRowBGC: 'transparent',
      carousel: 'page'
    }

    return (
      <div className='page_two dispaly'>
        <div className='the_one_ranking'>
          <BorderBox7 className='one_ranking_b7' style={{ height: 230, width: 550 }}>
            <div className='dispaly'>
              <div>
                <p style={{ marginBottom: 10 }}>省份排名</p>
                <SerialSortr dataList={ this.state.squareList } showType='square' />
              </div>
              <div className='ml-3'>
                <p style={{ marginBottom: 10 }}>城市排名</p>
                <SerialSortr dataList={ this.state.capsuleList } showType='capsule' />
              </div>
            </div>
          </BorderBox7>

          <BorderBox7 className='one_ranking_b7' style={{ height: 220, width: 550, marginTop: 20 }}>
            <p>停留时长分布</p>
            <div className='dispaly'>
              <div>
                <SerialSortr dataList={ this.state.progressList } showType='progress' />
              </div>
              <div className='ml-3'>
                <SerialSortr dataList={ this.state.progressList } showType='progress' />
              </div>
            </div>
          </BorderBox7>

          <BorderBox7 className='one_ranking_b7' style={{ height: 220, width: 550, marginTop: 20 }}>
            <p>游客分布排行</p>
            <div className='dispaly'>
              <div>
                <SerialSortr dataList={ this.state.squareList } showType='square' />
              </div>
              <div className='ml-3'>
                <SerialSortr dataList={ this.state.capsuleList } showType='capsule' />
              </div>
            </div>
          </BorderBox7>

        </div>
        <div style={{ width: '50%' }}>
          <div id='graph' style={{ height: 700 }} />
        </div>
        <BorderBox7 className='one_ranking_b7' style={{ height: 700, width: 550 }}>
          <p style={{ marginBottom: 10, marginTop: 10, marginLeft: 10 }}>路线热点Top10</p>
          <ScrollBoard config={tableConfig} style={{ width: '500px', height: '650px' }} />
        </BorderBox7>
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
