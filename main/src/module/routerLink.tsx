import React from 'react'
import { IMenuItem } from '../common/model/IMenuItem'
import Login from '../pages/login/login'
import PageOne from '../pages/pageOne'
import PageTwo from '../pages/pageTwo'

export const ASSETS_MENUS: IMenuItem[] = [
  { path: '/page-one', title: '页面一', exact: false, isShowTitle: true, render: () => <PageOne /> },
  { path: '/page-two', title: '页面二', exact: false, isShowTitle: true, render: () => <PageTwo /> },
  { path: '/login', title: '登录', exact: false, isShowTitle: false, render: () => <Login /> }
]
