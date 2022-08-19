import React from 'react'
import { useSelector } from "react-redux";

const ProfileScreen = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if(!currentUser){
        // Redirect("/")
    }
  return (
    <div>Profile.screen</div>
  )
}

export default ProfileScreen