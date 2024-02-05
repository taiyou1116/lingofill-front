"use client"

import { useStore } from '@/store/store';

function SidebarComponent() {
  const showSidebar = useStore((store) => store.showSidebar);
  const sidebarClass = showSidebar ? 'w-1/5 p-5 h-screen shadow-xl' : 'w-0 p-0';

  return (
    <div className={`${sidebarClass} transition-all duration-300`}>
      { showSidebar
       ? 
        <div className=" break-all">
          <h1>一覧</h1>
        </div>
       :
        null
      }
    </div>
  );
}

export default SidebarComponent