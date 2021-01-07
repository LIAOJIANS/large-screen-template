import React from 'react';
import { mapData } from './common/model/echartData'
import { FlylineChartEnhanced } from '@jiaminghi/data-view-react'
import './App.css'

function App() {
  return (
    <div className="App">
     
      <FlylineChartEnhanced config={mapData} style={{width: '100%', height: '100%'}} />
    </div>
  );
}

export default App;
