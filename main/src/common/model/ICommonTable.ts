
export interface ITableConfig {
  data: Array<Array<any>>, // 表数据
  header: string[], // 表头数据
  index?: boolean, // 显示行号
  columnWidth?: number[], // 列宽度
  align?: string[], // 列对齐方式
  rowNum?: number, // 表行数
  headerBGC?: string, // 表头背景色
  oddRowBGC?: string, // 奇数行背景色
  evenRowBGC?: string, // 偶数行背景色
  waitTime?: number, // 轮播时间间隔(ms)
  headerHeight?: number, // 表头高度
  indexHeader?: string, // 行号表头
  carousel?: 'single' | 'page', // 轮播方式
  hoverPause?: boolean // 悬浮暂停轮播
}

export interface ITabelEventParameter {
  ceil: string, // 当前点击的内容
  columnIndex: number, // 点击表格当前列的哪个
  row: string[], // 当前点击的那一行
  rowIndex: number // 当前点击在数组中的位置
}
