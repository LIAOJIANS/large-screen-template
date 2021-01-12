import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serverWorker';
import './static/index.css';
import { IEchartMapData } from './common/model/echartData'

let echartMapData:IEchartMapData = {}

// import * as serviceWorker from './serviceWorker';
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App echartMapData={ echartMapData } />
    </React.StrictMode>,
    document.getElementById('react-root')
  );
}

//  @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}


// 子组件协议就ok
export async function bootstrap (props: { echartMapData: IEchartMapData }) {
  console.log('react app bootstraped', props);
  echartMapData = props.echartMapData
}
export async function mount (props: { echartMapData: IEchartMapData }) {
  console.log('react app mount', props);
  render();
}
export async function unmount (props: { echartMapData: IEchartMapData, [key: string]: any }) {
  console.log('react app unmount', props);
  const { container } = props;
  ReactDOM.unmountComponentAtNode((container ? container.querySelector('#react-root') : document.getElementById('react-root') ) as HTMLElement);
}

serviceWorker.unregister();