"use client"

import { useStore } from '@/store/store';
import { m_plus_rounded_1c } from '@/store/fontStore';

function SidebarComponent() {
  const showSidebar = useStore((store) => store.showSidebar);
  const flipShowSidebar = useStore((store) => store.flipShowSidebar);

  // 背景とサイドバーをクリックしたときの処理
  const handleCloseSidebar = () => flipShowSidebar();
  const handleSidebarClick = (e: any) => e.stopPropagation();

  return (
    <div>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-75 ${showSidebar ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={handleCloseSidebar}>
      </div>
      <div 
        className={`fixed w-1/5 p-5 top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
        onClick={handleSidebarClick}
      >
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
      </div>
    </div>
  );
}

export default SidebarComponent