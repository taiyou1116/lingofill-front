"use client"

import React, { useState } from 'react'

function SidebarComponent() {
  const [showSidebar, onShowSidebar] = useState(true);

  return (
    <div>
      { showSidebar 
      ? 
      <div className=" h-screen bg-slate-300 p-5">
        SidebarComponent
      </div>
      : 
      null}
    </div>
  )
}

export default SidebarComponent