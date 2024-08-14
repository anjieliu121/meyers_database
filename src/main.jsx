import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TimeSeries from './components/TimeSeries'
import Bar from './components/Bar'
import StateClimateData from './pages/climate/StateClimateData'
import {BrowserRouter as Router} from "react-router-dom";
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

      <Router>
          {/*<App />*/}
          {/*<TimeSeries />*/}
          {/*<Bar />*/}
          {<StateClimateData />}
      </Router>

)
