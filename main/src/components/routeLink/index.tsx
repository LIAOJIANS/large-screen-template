import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, NavLink, RouteComponentProps } from 'react-router-dom'
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

interface IRouterProps {
  token: string
  setToken: (token: string) => void
  setUserInfo: (userInfo: InterUserInfo) => void
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
          menus?.map(i => i.isShowTitle && <NavLink key={ i.path } to={ i.path } className='nav-item' activeClassName='nav-item-active'>{ i.title }</NavLink>)
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
              {
                this.state.menus?.map(i => (
                  <Route path={ i.path } exact={ i.exact } render={i.render} key={ i.path } />
                ))
              }
              <Route
                path='*'
                exact
                render={props => {
                  const toPath = props.match.url
                  const history = props.history
                  const token = Cookie.get('USER_TOKEN')
                  if (
                    token &&
                    !this.props.token
                  ) {
                    this.props.setToken(token as string)
                    // getUserInfo<InterUserInfo>().then(res => {
                    //   this.props.setUserInfo(res)
                    // })
                  }

                  console.log(this.props.token)

                  if (
                    this.props.token &&
                    toPath === '/login'
                  ) {
                    history.goBack()
                    return null
                  }

                  if (
                    toPath === '/' ||
                    this.state.menus?.some(c => toPath !== c.path)
                  ) {
                    history.replace('/page-one')
                    return null
                  }

                  return this.props.token ? <Redirect to={ props.match.url } /> : <Redirect to='/login' />
                }}
              />
            </Switch>
          </BrowserRouter>
        </InitEchartContext.Provider>
      </div>
    )
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
