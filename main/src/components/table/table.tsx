import React from 'react'
import { ScrollBoard } from '@jiaminghi/data-view-react'
import { ITableConfig, ITabelEventParameter } from '../../common/model/ICommonTable'

interface ICommonTabelProps {
  config: ITableConfig
  tableStyle?: Partial<CSSStyleDeclaration>
  onClick?: (e: ITabelEventParameter) => void
}

interface ICommonTabelState {}

export default class CommonTabel extends React.Component<ICommonTabelProps, ICommonTabelState> {
  render() {
    const { config, tableStyle, onClick } = this.props
    return (
      <ScrollBoard config={ config } style={{ ...tableStyle }} onClick={ onClick } />
    )
  }
}
