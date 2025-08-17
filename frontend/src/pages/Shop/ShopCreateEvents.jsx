import React from 'react'
import CreateEvents from '../../components/Shop/CreateEvents'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'

function ShopCreateEvents() {
  return (
     <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] md:w-[280px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
        <CreateEvents/>
        </div>
      </div>
    </div>  )
}

export default ShopCreateEvents