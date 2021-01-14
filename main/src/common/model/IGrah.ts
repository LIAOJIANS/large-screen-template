import { GraphEdgeItemOption } from 'echarts/lib/chart/graph/GraphSeries'

export interface ILinks extends GraphEdgeItemOption {
  name: string,
  [key: string]: any
}

export interface INodes {
  attributes: { [key: string]: any },
  id: string,
  name: string | null,
  category: number,
  itemStyle: null | any,
  symbolSize: number,
  label: { normal: { show: boolean } },
  value: number,
  x: number,
  y: number
}

export interface ICategories {
  name: string
}
