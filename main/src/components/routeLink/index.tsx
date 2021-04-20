import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, NavLink, RouteComponentProps } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { ASSETS_MENUS } from '../../module/routerLink'
import { IMenuItem } from '../../common/model/IMenuItem'
import './routeLink.scss'
import { EchartContext, InitEchartContext, InterInitEchartContxt } from '../../module/echarts'
import { connect } from 'react-redux'
import { InterUser, InterUserInfo } from '../../store/model/IUser'
import { ICombinedState } from '../../store/reducers'
import Cookie from 'js-cookie'
import { Dispatch } from 'redux'
import { SET_TOKEN, SET_USERINFO } from '../../store/activeTypes'
import { getUserInfo } from '../../api/userApi'

interface IRouterProps extends RouteComponentProps {
  token: string
  setToken: (token: string) => void
  setUserInfo: (userInfo: InterUserInfo) => void
  [key: string]: any
}

interface IRouterState {
  menus?: IMenuItem[]
}

class RouterLink extends React.Component<IRouterProps, IRouterState> {
  state: IRouterState = {}

  componentDidMount() {
    this.setState({
      menus: ASSETS_MENUS
    })
  }

  routerList = () => {
    const menus = this.state.menus
    return (
      <div className='nav dispaly-content-center mt-1'>
        {
          menus?.map(i =>
            i.isShowTitle &&
            <NavLink key={ i.path } to={ i.path } className='nav-item' activeClassName='nav-item-active'>{ i.title }</NavLink>
          )
        }
      </div>
    )
  }

  render() {
    const echartContext: InterInitEchartContxt = new EchartContext()
    return (
      <div>
        <InitEchartContext.Provider value={ echartContext } >
          <BrowserRouter>
            { this.props.token && this.routerList() }
            <Switch>
              {/* {
                this.state.menus?.map(i => (
                  // <Route path={ i.path } exact={ i.exact } render={i.render} key={ i.path } />

                ))
              } */}

              <RouterGuard
                menus={ this.state.menus }
                token={ this.props.token }
                setToken={ this.props.setToken }
                setUserInfo={ this.props.setUserInfo }
                location={this.props.location}
                match={this.props.match}
                history={this.props.history}
              />
              {/* <Route
                path='*'
                exact
                render={props =>
                  <RouterGuard
                    routeInfo={ props }
                    menus={ this.state.menus }
                    token={ this.props.token }
                    setToken={ this.props.setToken }
                    setUserInfo={ this.props.setUserInfo }
                  />}
              /> */}
            </Switch>
          </BrowserRouter>
        </InitEchartContext.Provider>
      </div>
    )
  }
}

interface RouterGuardProps extends IRouterProps {
  menus?: IMenuItem[]
  [key: string]: any
}

// 路由守卫高阶组件( 只适配一级路由 )
class RouterGuard extends React.Component<RouterGuardProps, {}> {
  async componentDidMount() {
    const { token: reduxToken } = this.props
    const token = Cookie.get('USER_TOKEN')
    if (
      token &&
      !reduxToken
    ) {
      this.props.setToken(token as string)
      await getUserInfo<InterUserInfo>().then(res => {
        this.props.setUserInfo(res)
      })
    }
  }

  render() {
    const { menus, token: reduxToken, location } = this.props

    const history = createBrowserHistory()

    let toPath = location.pathname

    if (!reduxToken && toPath !== '/login') { // 如果没登陆
      toPath = '/login'
      history.replace(toPath)
    }

    // 获取当前路由的路由对象
    const component: IMenuItem = menus?.find(i => i.path === toPath) as IMenuItem

    if (!reduxToken && component) { // 没有登录 并且存在路由对象
      return <Route path={ toPath } exact={ component.exact } render={component.render} key={ component.path } />
    }

    // 登录了 并且跳往登录页，则返回上一级
    if (
      reduxToken &&
      toPath === '/login'
    ) {
      history.goBack()
      return null
    }

    // 重定向首页
    if (
      toPath === '/' ||
      !menus?.some(c => toPath !== c.path)
    ) {
      return <Redirect to='/page-one' />
    }

    // return this.props.token ? <Redirect to={ props.match.url } /> : <Redirect to='/login' />

    if (reduxToken) { // 渲染加载路由
      return <Route path={ component.path } exact={ component.exact } render={component.render} key={ component.path } />
    } else {
      return <Redirect to='/login' />
    }
  }
}

const mapStateToProps = (state: ICombinedState): InterUser => state.user

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setToken: (token: string) => dispatch({ type: SET_TOKEN, token }),
  setUserInfo: (userInfo: InterUserInfo) => dispatch({ type: SET_USERINFO, userInfo })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterLink)
