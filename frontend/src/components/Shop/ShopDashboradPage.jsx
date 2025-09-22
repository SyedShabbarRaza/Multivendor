import React, { useState } from 'react'
import DashboardHeader from './Layout/DashboardHeader.jsx'
import DashboardSideBar from './Layout/DashboardSideBar.jsx'
import DashboardHero from '../../components/Shop/DashboardHero.jsx'
function ShopDashboradPage() {
      const [active,setActive]=useState(1);
  return (
<div className="">
        <DashboardHeader/>
        <div className="flex items-center justify-between w-full">
            <div className="w-[280px]">
                <DashboardSideBar active={active} setActive={setActive}/>
            </div>
            <DashboardHero/>
        </div>
</div>
  )
}

export default ShopDashboradPage