"use client"

import { useStore } from '@/store/store';

function SidebarComponent() {
  const showSidebar = useStore((store) => store.showSidebar);

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