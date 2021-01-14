import { IScrollRankingBoardData } from '../../common/model/ICommon'

export interface ISquare extends IScrollRankingBoardData {}

export interface ICapsule {
  data?: IScrollRankingBoardData[],
  colors?: string[],
  unit?: string,
  showValue?: boolean
}

export interface IAddressRank {
  square: ISquare[],
  capsule: IScrollRankingBoardData[]
}
