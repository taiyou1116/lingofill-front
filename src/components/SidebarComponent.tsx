"use client"

import { useStore } from '@/store/store';
import { m_plus_rounded_1c } from '@/store/fontStore';

function SidebarComponent() {
  const showSidebar = useStore((store) => store.showSidebar);
  const sidebarClass = showSidebar ? 'w-1/5 p-5 h-screen shadow-xl' : 'w-0 p-0';

  return (
    <div className={`${sidebarClass} transition-all duration-300`}>
      { showSidebar
       ? 
        <div className=" break-all flex flex-col items-center gap-3">
          <h1 className={`${m_plus_rounded_1c.className} text-lg`}>テキスト一覧</h1>
          <div className=' bg-slate-100 h-full w-full p-3 cursor-pointer'>
            テスト1
          </div>
          <div className=' bg-slate-100 h-full w-full p-3 cursor-pointer'>
            テスト2
          </div>
          <div className=' bg-slate-100 h-full w-full p-3 cursor-pointer'>
            テスト3
          </div>
        </div>
       :
        null
      }
    </div>
  );
}

export default SidebarComponent