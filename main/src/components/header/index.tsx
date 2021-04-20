import React from 'react'
import { Decoration5 } from '@jiaminghi/data-view-react'
import './header.scss'
import {
  parseTime
} from '../../utils/tool'
import { InterUserInfo } from '../../store/model/IUser'

interface IHeaderTopState {}

interface IHeaderTopProps {
  currentTime: Date | string | number
  headerTitle: string
  userInfo: InterUserInfo
  logout: () => void
}

export default class HeaderTop extends React.Component<IHeaderTopProps, IHeaderTopState> {
  render() {
    return (
      <div className='header-top'>
        <div className='app-header dispaly-center'>
          <p style={{ width: '20%' }}>
            { parseTime(this.props.currentTime) }<i className='pl-1'>欢迎您，{ this.props.userInfo.name }</i>
            <span style={{ color: 'red', fontSize: '14px', cursor: 'pointer', paddingLeft: '5px' }} onClick={() => this.props.logout()}>退出</span>
          </p>
          <div className='title dispaly-content-center'>
            <div>
              <p style={{ marginBottom: 0 }}>{ this.props.headerTitle }</p>
              <Decoration5 style={{ width: '100%', height: '30px' }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
