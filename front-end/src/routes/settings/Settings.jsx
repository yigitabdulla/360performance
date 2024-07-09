import React from 'react'
import SideNavbar from '../../components/navbar/sideNavbar/SideNavbar'
import "./settings.scss"

export default function Settings() {
  return (
    <div className='settings'>
      <div className="sideNavbar">
        <SideNavbar />
      </div>

      <div className="settingsContainer">
        settings
      </div>

    </div>
  )
}
