import Image from 'next/image'
import React from 'react'

type Props = {
  title: React. ReactNode,
  text: React. ReactNode,
  img: string,
}

function DocumentDetailsMobile(props: Props) {
  const { title, text, img } = props;
  return (
    <div className=" flex flex-col justify-center items-center mt-32">
      <h1 className=" text-5xl text-blue-500">{ title }</h1>
      <div className=" flex items-center gap-3">
        <div className=" flex pt-16 px-6 gap-5">
          <div className=" flex flex-col gap-5 dark:text-gray-300">
            { text }
          </div>
        </div>
      </div>
      <Image src={ img } width="500" height="500" alt='ロゴ' />
    </div> 
  )
}

export default DocumentDetailsMobile