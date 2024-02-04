import React from 'react'
import { Reorder } from "@mui/icons-material";
import { M_PLUS_Rounded_1c } from "next/font/google";

const m_plus_rounded_1c_bold = M_PLUS_Rounded_1c({
  weight: "700",
  subsets: ["latin"],
})

function HeaderCmponent() {
  return (
    <div className="header-bg-height bg-cyan-500 flex items-center pl-4 gap-4">
      <button>
        <Reorder style={{fontSize: 35}} />
      </button>
      <h1 className={` text-xl ${m_plus_rounded_1c_bold.className}`}>
        Lingo Fill
      </h1> 
    </div>
  )
}

export default HeaderCmponent