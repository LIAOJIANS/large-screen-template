import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { ASSETS_MENUS } from '../../module/routerLink'
import { IMenuItem } from '../../common/model/IMenuItem'
import './routeLink.scss'
import { EchartContext, InitEchartContext, InterInitEchartContxt } from '../../module/echarts'
import { connect } from 'react-redux'
import { InterUser } from '../../store/model/IUser'
import { ICombinedState } from '../../store/reducers'

interface IRouterProps {
  token: string
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

                  if ((this.props.token && toPath === '/login')) {
                    history.goBack()
                    return null
                  }

                  if (toPath === '/' || this.state.menus?.some(c => toPath !== c.path)) {
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

export default connect(
  mapStateToProps,
  {}
)(RouterLink)
