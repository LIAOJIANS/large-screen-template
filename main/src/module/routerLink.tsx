import React from 'react'
import { IMenuItem } from '../common/model/IMenuItem'
import PageOne from '../pages/pageOne'
import PageTwo from '../pages/pageTwo'

export const ASSETS_MENUS: IMenuItem[] = [
  { path: '/page-one', title: '页面一', exact: false, render: () => <PageOne /> },
  { path: '/page-two', title: '页面二', exact: false, render: () => <PageTwo /> }
]
