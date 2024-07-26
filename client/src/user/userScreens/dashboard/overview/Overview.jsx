import React from 'react'
import PieChart from './PieChart'
import BarChart from './BarChart'
import OverviewCards from './OverviewCards'
import "./Overview.scss"

const Overview = () => {
  return (
    <div className="overviewMain">
      <div className="upperContainer">
         <h1>OVERVIEW</h1>
         <div className="upperWrapper">
          <PieChart/>
          <OverviewCards/>
         </div>
      </div>
      <div className="lowerContainer">
        <h1>PERFORMANCE</h1>
        <BarChart/>
      </div>
    </div>
  )
}

export default Overview




      {/* <PieChart/> */}
      {/* <OverviewCards/> */}
      {/* <BarChart/> */}