import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import './pageOne.scss'
import {
  BorderBox11,
  BorderBox10,
  Decoration7,
  BorderBox7,
  ScrollRankingBoard
} from '@jiaminghi/data-view-react'
import { InterInitEchartContxt, InitEchartContext } from '../../module/echarts'
// import { ILodingView, LoadingContext } from '../../module/loading'
import { echartLine, echartScatter } from '../../api/echartApi'
import { tableDataOne, rankingDataOne } from '../../api/tableApi'
import { searchData } from '../../api/pageOneApi'
import CommonTabel from '../../components/table/table'
import { ITableConfig, ITabelEventParameter } from '../../common/model/ICommonTable'
import { AbstractComponent } from '../../module/AbstractComponent'

import {
  IEcharts,
  IScrollRankingBoardData,
  ISelectData,
  IScrollRankingBoard
} from './model'
// import { IUniversalContext } from '../../module/universalContext'
// import { ILodingView } from '../../module/loading'

interface IPageOneProps extends RouteComponentProps {
  [key:string]:any
}
interface IPageOneState {
  tableDataOne: [],
  tableOneHeader: string[],
  searchVal: string,
  selectData: ISelectData[],
  rankingData: IScrollRankingBoardData[]
}

class PageOne extends AbstractComponent<IPageOneProps, IPageOneState> {
  static contextType = InitEchartContext
  context!: InterInitEchartContxt;

  // eslint-disable-next-line @typescript-eslint/no-parameter-properties
  // public constructor(props: IPageOneProps, private backend: IUniversalContext) {
  //   super(props)
  // }

  state: IPageOneState = {
    tableDataOne: [],
    tableOneHeader: ['表头1', '表头2', '表头3', '表头4'],
    searchVal: '',
    selectData: [],
    rankingData: []
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    // this.backend.loadShow({ msg: 'loading', isShowLoading: true })
    echartLine<IEcharts>()?.then(res => {
      this.context.initEchart('echart-ser', this.context.lineDataFormat(res))
    })

    echartScatter<IEcharts>()?.then(res => {
      this.context.initEchart('echart-ses', this.context.scatterDataFormat(res))
    })

    tableDataOne<[]>()?.then(res => {
      this.setState({ tableDataOne: res })
    })

    searchData<ISelectData[]>()?.then(res => {
      this.setState({ selectData: res })
    })

    rankingDataOne<IScrollRankingBoardData[]>()?.then(res => {
      this.setState({ rankingData: res })
    })
  }

  tableOne() {
    const config: ITableConfig = {
      header: this.state.tableOneHeader,
      data: (this.searchTableData()?.length > 0 && this.searchTableData()) || this.tableOneFormat(this.state.tableDataOne),
      index: true,
      indexHeader: '序号',
      evenRowBGC: '#10213f',
      rowNum: 3,
      headerBGC: '#20314c',
      columnWidth: [80, 140, 140, 140, 140],
      align: ['center', 'center', 'center', 'center', 'center'],
      oddRowBGC: 'transparent'
    }
    return (
      <div style={{ padding: '5px 10px 10px 10px' }}>
        <CommonTabel
          config={ config }
          tableStyle={{ width: '100%', height: '150px', cursor: 'pointer' }}
          onClick={(e: ITabelEventParameter) => console.log(e)}
        />
      </div>
    )
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

  searchTableData() {
    const { tableDataOne, searchVal } = this.state
    const curTableData = this.tableOneFormat(tableDataOne)
    return searchVal ? curTableData.map(i => (i.filter(c => c.indexOf(searchVal) !== -1))) : curTableData
  }

  selectOptions() {
    return (
      <div className='search-select dispaly-center'>
        <select name='' id=''>
          <option value='2020'>2020</option>
        </select>
        <select name='' id=''>
          {
            this.state.selectData?.map((c, i) => <option key={ i } value={ c.val }>{ c.label }</option>)
          }
        </select>
      </div>
    )
  }

  ranking() {
    const rankingConfig: IScrollRankingBoard = {
      data: this.state.rankingData
    }
    return (
      <ScrollRankingBoard config={ rankingConfig } style={{ height: '200px' }} />
    )
  }

  render() {
    console.log(this.props.location)

    return (
      <div className='service-site-efficiency mt-3 pl-2 pr-2 dispaly-space'>
        <div className='site-left'>
          <BorderBox11 className='site-left-acceptance' title='xxxxxx' style={{ height: '280px' }}>
            <div className='seach-if dispaly-flex' style={{ padding: '5px 10px 0px 10px' }}>
              <div className='search'>
                <input
                  type='text'
                  placeholder='请输入关键字'
                  onChange={ (e) => this.setState({ searchVal: e.target.value }) }
                  value={this.state.searchVal}
                />
                <button onClick={ () => this.setState({ searchVal: '' }) }>清空</button>
              </div>
              { this.selectOptions?.() }
            </div>
            { this.tableOne?.() }
          </BorderBox11>

          <BorderBox10 className='site-left-appeal' style={{ height: '340px' }}>
            <div style={{ padding: '20px' }}>
              <Decoration7 className='decoration7' style={{ width: '100%', height: '30px' }} >xxxxx</Decoration7>
              <div
                id='echart-ser'
                style={{ height: '250px', background: 'rgba(3,24,59, .3)' }}
              />
            </div>
          </BorderBox10>
        </div>

        <div className='site-body pl-1 pr-1'>
          <div id='large-screen-content' style={{ width: '100%', height: '100%' }} />
        </div>

        <div className='site-right'>

          <BorderBox10 style={{ height: '340px' }}>
            <div style={{ padding: '20px' }}>
              <Decoration7 className='decoration7' style={{ width: '100%', height: '30px' }} >xxxxx</Decoration7>
              <div
                id='echart-ses'
                style={{ height: '250px', background: 'rgba(3,24,59, .3)' }}
              />
            </div>
          </BorderBox10>

          <BorderBox7 className='site-lint mt-2' style={{ height: '280px' }}>
            <div style={{ padding: '10px 20px 20px' }}>
              <Decoration7 className='decoration7' style={{ width: '100%', height: '30px' }} >xxxxx</Decoration7>
              { this.ranking?.() }
            </div>
          </BorderBox7>

        </div>
      </div>
    )
  }
}

export default withRouter(PageOne)
