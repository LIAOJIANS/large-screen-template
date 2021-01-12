import React from 'react'
import HeaderTop from './components/header/index'
import RouterLink from './components/routeLink/index'
import './App.scss'
import { Loading, FullScreenContainer } from '@jiaminghi/data-view-react'
import { registerMicroApps, start } from 'qiankun'
import { echartMap } from './api/echartApi'
import { IEchartMapData } from './common/model/ICommon'
import { connect } from 'react-redux'
import { ILoadingState, IOptions } from './store/reducers/loadingStateRedc'
import { ICombinedState } from './store/reducers'

class App extends React.Component<{
  loadingState: IOptions
}, {
  echartMapData: IEchartMapData
}> {
  state = {
    echartMapData: {}
  }

  async componentDidMount() {
    await echartMap<IEchartMapData>()?.then(res => {
      this.setState({ echartMapData: res })
    })
    registerMicroApps([
      {
        name: 'screen-content', // 微应用的名称，微应用之间必须确保唯一(微应用中package.json中的name)
        entry: 'http://localhost:20000', // 微应用的entry地址
        container: '#large-screen-content', // 微应用的容器节点的选择器
        activeRule: '/page-one', // 微应用 的激活规则
        props: {
          echartMapData: this.state.echartMapData
        }
      }
    ])
    start({ prefetch: false }) // 启动，配置all则主应用start后即开始预加载所有微应用静态资源
  }

  render() {
    const { isShowLoading, msg } = this.props.loadingState
    return (
      <div className='App'>
        <FullScreenContainer style={{ background: ' radial-gradient(ellipse closest-side, #125886, #000e25)' }}>
          { isShowLoading ? <Loading>{ msg }</Loading> : null }
          <HeaderTop
            headerTitle='大屏公用模板'
            currentTime={ new Date().getTime() }
          />
          <RouterLink />
        </FullScreenContainer>
      </div>
    )
  }
}

const mapStateToProps = (state: ICombinedState): ILoadingState => state.loadingStore
export default connect(
  mapStateToProps,
  {}
)(App)
