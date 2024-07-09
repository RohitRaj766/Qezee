import React from 'react'
import Sidebar from './user/userScreens/dashboard/Sidebar'
import DashboardHeader from './user/userScreens/dashboard/DashboardHeader'
import './Page.scss'

const Page = () => {
  return (
    <div className='center'> 
        <Sidebar/>
        <DashboardHeader/>
    </div>
  )
}

export default Page