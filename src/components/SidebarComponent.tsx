"use client"

import { useStore } from '@/store/store';

function SidebarComponent() {
  const showSidebar = useStore((store) => store.showSidebar);

  const sidebarContainerClass = `${showSidebar ? 'w-screen' : ''}`;

  return (
    <div className={`${sidebarContainerClass}`}>
      { showSidebar 
      ? 
        <div className=" h-screen p-5 shadow-xl">
          SidebarComponent
        </div>
      : 
        null
      }
    </div>
  )
}

export default SidebarComponent