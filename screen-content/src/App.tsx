import React from 'react';
import { IEchartMapData } from './common/model/echartData'
import { FlylineChartEnhanced } from '@jiaminghi/data-view-react'
// import './App.css'

class App extends React.Component<{
  echartMapData: IEchartMapData
}, {}> {
  render() {
    return (
      <div className="App">
        <FlylineChartEnhanced config={
          this.props.echartMapData
        } style={{width: '100%', height: '100%'}} />
      </div>
    )
  }
}

export default App;
