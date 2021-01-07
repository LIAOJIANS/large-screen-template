import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { AbstractComponent } from '../../module/AbstractComponent'
// import { IUniversalContext, UniversalContext } from '../../module/universalContext'

interface IPageTwoProps extends RouteComponentProps {}

interface IPageTwoState {}

class PageTwo extends AbstractComponent<IPageTwoProps, IPageTwoState> {
  render() {
    return (
      <div>
        页面2
      </div>
    )
  }
}

export default withRouter(PageTwo)
