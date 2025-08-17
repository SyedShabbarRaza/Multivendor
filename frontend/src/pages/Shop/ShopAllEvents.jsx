import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.jsx'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.jsx'
import AllEvents from '../../components/Shop/AllEvents'

function ShopAllEvents() {
  return (
     <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] md:w-[280px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
        <AllEvents/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllEvents