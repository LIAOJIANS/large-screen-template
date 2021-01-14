
export interface IPoint {
  name?: string, // 点名称
  coordinate?: number[], // 点坐标
  halo?: IHalo, // 点光晕配置
  text?: IText, // 点文本配置
  icon?: IIcon // 点图标配置
}

export interface IFlyline {
  source?: string, // 飞线起点的点名称
  target?: string, // 飞线终点的点名称
  width?: number, // 飞线宽度
  color?: string, // 飞线颜色
  orbitColor?: string, // 飞线轨迹颜色
  duration?: number[], // 飞线动画时长
  radius?: number // 飞线显示半径
}

export interface IHalo {
  show?: boolean, // 是否显示光晕
  duration?: number[], // 光晕动画时长
  color?: string, // 光晕颜色
  radius?: number // 光晕最大半径
}

export interface IText {
  show?: boolean, // 是否显示点名称
  offset?: number[], // 名称位置偏移
  color?: string, // 名称颜色
  fontSize?: number // 名称文字大小
}

export interface IIcon {
  show?: boolean, // 是否显示点图标
  src?: string, // 图标src
  width?: number, // 图标宽度
  height?: number // 图标高度
}

export interface ILine {
  line?: number, // 飞线宽度
  color?: string, // 飞线颜色
  orbitColor?: string, // 轨迹颜色
  duration?: number[], // 飞线动画时长
  radius?: number, // 飞线显示半径
}

export interface IEchartMapData {
  points?: IPoint[], // 飞线点
  lines?: IFlyline[], // 飞线
  halo?: IHalo, // 全局光晕配置
  text?: IText, // 全局文本配置
  icon?: IIcon, // 全局图标配置
  line?: ILine, // 全局飞线配置
  bgImgSrc?: string, // 背景图src
  k?: number, // 飞线收束程度
  curvature?: number, // 飞线曲率
  relative?: boolean // 使用相对坐标
}

export interface IScrollRankingBoardData {
  name: string,
  value: number
}
