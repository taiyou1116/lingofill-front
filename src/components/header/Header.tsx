
"use client"

import { GrobalStore } from "@/store/grobalStore";
import { Toaster } from "react-hot-toast";
import { useWindowSize } from "@/hooks/hooks";
import { truncateText } from "@/utils/textUtils";
import TextList from "./TextList";
import HomeLink from "./HomeLink";
import AcountMenu from "./AcountMenu";

function HeaderComponent() {
  const {document} = GrobalStore();
  const { width } = useWindowSize();
  const isSm = width <= 640;

  return (
    <div 
      className="fixed z-10 w-full header-bg-height flex items-center justify-between shadow-sm dark:shadow-2xl 
               bg-white dark:bg-gray-600"
    >
      <div className='flex items-center pl-4 gap-5 w-full'>
        <TextList />
        { isSm
        ?
          <div className=" dark:text-gray-100">{ truncateText(document?.title, 25)}</div>
        :
          <HomeLink />
        }
      </div>
      <div className={`flex ${ isSm ? 'px-1' : 'px-10' } items-center gap-1`}>
        <AcountMenu />
      </div>
      <Toaster 
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default HeaderComponent