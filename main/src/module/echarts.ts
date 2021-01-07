import React from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/graph'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/graphic'
import 'echarts/lib/component/legendScroll'

import { EChartsFullOption } from 'echarts/lib/option'
import { ScatterSeriesOption } from 'echarts/lib/chart/scatter/ScatterSeries'
import { IEcharts, ILineSeries, IScatterSeries } from '../pages/pageOne/model'

// enum LineType {
//   LINE = 1 << 1,
//   LINE_AND_BAR = 1 << 2,
//   BAR = 1 << 3,
//   SCATTER = 1 << 4,
// }

export interface InterInitEchartContxt {
  initEchart: (id: string, type: EChartsFullOption) => void
  getDocumentElementId: (id: string) => HTMLElement

  lineDataFormat: (echartData: IEcharts) => EChartsFullOption
  lineSeriesDataFormat: (ser: ILineSeries[]) => ILineSeries[]

  scatterDataFormat: (echartData: IEcharts) => EChartsFullOption
  scatterSeriesObj: () => ScatterSeriesOption
  scatterSeriesTitleFormat: (srcData: IScatterSeries[]) => string[]
  scatterSeriesDataFormat: (srcData: IScatterSeries[]) => ScatterSeriesOption[]
}

export class EchartContext implements InterInitEchartContxt {
  getDocumentElementId(id: string): HTMLElement {
    return document.getElementById(id) as HTMLElement
  }

  initEchart(id: string, data: EChartsFullOption) {
    echarts.init(this.getDocumentElementId(id) as HTMLElement).setOption(data)
  }

  lineDataFormat(echartData: IEcharts): EChartsFullOption {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#616E80'
          }
        }
      },
      legend: {
        data: echartData.titleArr,
        textStyle: {
          color: '#6D7988'
        },
        right: 'left'
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: echartData.xAxisArr,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          min: 0,
          max: 80,
          interval: 20,
          axisLabel: {
            formatter: '{value}',
            color: '#728FAA'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#6D7988'
            }
          }
        },
        {
          type: 'value',
          min: 0,
          max: 100,
          interval: 25,
          axisLabel: {
            formatter: '{value}%',
            color: '#728FAA'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#6D7988'
            }
          }
        }
      ],
      series: this.lineSeriesDataFormat(echartData.seriesArr as ILineSeries[])
    }
  }

  lineSeriesDataFormat(ser: ILineSeries[]): ILineSeries[] {
    ser.map(i => {
      if (i.type === 'line') {
        i.yAxisIndex = 1
        i.lineStyle = {
          color: '#1EBCA1'
        }
        i.itemStyle = {
          color: '#1EBCA1'
        }
      }

      return i
    })
    return ser
  }

  scatterSeriesTitleFormat(srcData: IScatterSeries[]): string[] {
    let titleArr: string[] = []
    srcData.forEach(i => {
      titleArr = [...titleArr, i.d1 as string]
    })
    return titleArr
  }

  scatterSeriesObj(): ScatterSeriesOption {
    return {
      name: '',
      data: [],
      type: 'scatter',
      symbolSize: function(data) {
        return Math.sqrt(data[0]) / 5 // 球球大小
      },
      emphasis: {
        label: {
          show: true,
          formatter: function(param: { data: any[]; }) {
            return param.data[2]
          },
          position: 'top'
        }
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(120, 36, 50, 0.5)',
        shadowOffsetY: 5
      }
    }
  }

  scatterSeriesDataFormat(srcData: IScatterSeries[]): ScatterSeriesOption[] {
    let seriesArr: ScatterSeriesOption[] = []
    let curObj = {}
    srcData.forEach(i => {
      curObj = {
        data: [[i.d3, i.d2, i.d1]],
        name: i.d1
      }
      seriesArr = [
        ...seriesArr,
        {
          ...this.scatterSeriesObj(),
          ...curObj
        }
      ]
    })
    return seriesArr
  }

  scatterDataFormat(echartData: IEcharts): EChartsFullOption {
    return {
      legend: {
        type: 'scroll',
        top: 10,
        data: echartData.data && this.scatterSeriesTitleFormat(echartData.data),
        textStyle: {
          color: '#6D7988'
        },
        pageButtonPosition: 'end'
      },
      xAxis: {
        axisLabel: {
          color: '#728FAA'
        },
        splitLine: {
          lineStyle: {
            type: 'solid',
            color: 'transparent'
          }
        }
      },
      yAxis: {
        axisLabel: {
          color: '#728FAA'
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#6D7988'
          }
        },
        scale: true
      },
      grid: {
        top: '20%',
        left: '3%',
        right: '12%',
        bottom: '3%',
        containLabel: true
      },
      series: echartData.data && this.scatterSeriesDataFormat(echartData.data)
    }
  }
}

export const InitEchartContext = React.createContext<InterInitEchartContxt>(null as any)