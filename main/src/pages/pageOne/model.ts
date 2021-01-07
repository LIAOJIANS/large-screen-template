import { LineSeriesOption } from 'echarts/lib/chart/line/LineSeries'
import { EChartsFullOption } from 'echarts/lib/option'

export interface IScatterSeries {
  id: string | null,
  d2: string | null,
  d3: string | null,
  d6: string | null,
  d1: string | null,
  d4: string | null,
  d5: string | null
}

export interface ILineSeries extends LineSeriesOption {
  name: string,
  [key: string]: any
}

export interface IEcharts extends EChartsFullOption {
  titleArr?: string[],
  xAxisArr?: string[],
  seriesArr?: ILineSeries[] | ILineSeries,
  data?: IScatterSeries[] | any[]
}

export interface ISelectData {
  label: string,
  val: any
}

export interface IScrollRankingBoardData {
  name: string,
  value: number
}

export interface IScrollRankingBoard {
  data: IScrollRankingBoardData[], // 表数据
  rowNum?: number, // 表行数
  waitTime?: number, // 轮播时间间隔(ms)
  carousel?: 'single' | 'page', // 轮播方式
  unit?: string, // 数值单位
  sort?: boolean // 自动排序
}
