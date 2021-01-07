import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serverWorker';

import './static/index.css';

// import * as serviceWorker from './serviceWorker';
function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('react-root')
  );
}
// if (window.__POWERED_BY_QIANKUN__) { // 动态添加public path
//   // webpack的路径被赋值
//   // eslint-disable-next-line no-undef
//   __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
// }

// console.log((window as any).__POWERED_BY_QIANKUN__);

//  @ts-ignore
// console.log(window.__POWERED_BY_QIANKUN__);  

//  @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  console.log(1);
  
  render()
}


// 子组件协议就ok
export async function bootstrap (props: any) {
  console.log('react app bootstraped', props);
}
export async function mount (props: any) {
  console.log('react app mount', props);
  render();
}
export async function unmount (props: any) {
  console.log('react app unmount', props);
  ReactDOM.unmountComponentAtNode(document.getElementById('react-root') as HTMLElement);
}

serviceWorker.unregister();