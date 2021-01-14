import React from 'react'
import { BrowserRouter, Switch, Route, Redirect, NavLink } from 'react-router-dom'
import { ASSETS_MENUS } from '../../module/routerLink'
import { IMenuItem } from '../../common/model/IMenuItem'
import './routeLink.scss'
import { EchartContext, InitEchartContext, InterInitEchartContxt } from '../../module/echarts'

interface IRouterProps {}

interface IRouterState {
  menus?: IMenuItem[]
}

export default class RouterLink extends React.Component<IRouterProps, IRouterState> {
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
          menus?.map(i => <NavLink key={ i.path } to={ i.path } className='nav-item' activeClassName='nav-item-active'>{ i.title }</NavLink>)
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
            { this.routerList() }
            <Switch>
              <Route path='/' exact render={() => <Redirect to='/page-one' />} />
              {
                this.state.menus?.map(i => (
                  <Route path={ i.path } exact={ i.exact } render={ i.render } key={ i.path } />
                ))
              }
            </Switch>
          </BrowserRouter>
        </InitEchartContext.Provider>
      </div>
    )
  }
}
