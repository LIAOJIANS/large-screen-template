import React from 'react'
import HeaderTop from './components/header/index'
import RouterLink from './components/routeLink/index'
import './App.scss'
import { Loading, FullScreenContainer } from '@jiaminghi/data-view-react'
import { registerMicroApps, start } from 'qiankun'
import { echartMap } from './api/echartApi'
import { IEchartMapData } from './common/model/ICommon'
// import {
//   UniversalContext,
//   Universal,
//   IUniversalContext
// } from './module/universalContext'
export interface IOptions {
  msg: any,
  isShowLoading: boolean
}

class App extends React.Component<{}, {
  store: IOptions,
  echartMapData: IEchartMapData
}> {
  state = {
    store: {
      msg: '',
      isShowLoading: false
    },
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

  // loadShow(options: IOptions) {
  //   this.setState({
  //     store: options
  //   })
  // }

  render() {
    // const universalContext: IUniversalContext = new Universal()

    return (
      <div className='App'>
        {/* <UniversalContext.Provider value={ universalContext }> */}
        <FullScreenContainer style={{ background: ' radial-gradient(ellipse closest-side, #125886, #000e25)' }}>
          { this.state.store.isShowLoading && <Loading>{ this.state.store.msg }</Loading> }
          <HeaderTop
            headerTitle='大屏公用模板'
            currentTime={ new Date().getTime() }
          />
          <RouterLink />
        </FullScreenContainer>
        {/* </UniversalContext.Provider> */}

      </div>
    )
  }
}

export default App
