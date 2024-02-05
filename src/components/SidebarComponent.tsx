"use client"

import { useStore } from '@/store/store';

function SidebarComponent() {
  const showSidebar = useStore((store) => store.showSidebar);
  const sidebarClass = showSidebar ? 'w-1/5 p-5 h-screen shadow-xl' : 'w-0 p-0';

  return (
    <div className={`${sidebarClass} transition-all duration-300`}>
      <div className="">
        SidebarComponent
      </div>
    </div>
  );
}

export default SidebarComponent