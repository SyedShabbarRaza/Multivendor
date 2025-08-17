import React, { useState } from "react";
import styles from "../styles/styles";
import Header from "../components/Layout/Header";
import ProfileContent from "../components/profile/ProfileContent";
import ProfileSidebar from "../components/profile/profileSidebar";

function ProfilePage() {
  const [active,setActive]=useState(1);
  return (
    <div>
      <Header/>
      <div className="w-11/12 mx-auto flex">
    <div className="w-[55px] md:w-[15%] mt-[15%] md:mt-0">
    <ProfileSidebar active={active} setActive={setActive}/>
    </div>
    <ProfileContent active={active}/>
  </div>;
    </div>
  )
}

export default ProfilePage;
