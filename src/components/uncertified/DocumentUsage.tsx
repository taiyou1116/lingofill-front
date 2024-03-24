import Image from 'next/image'
import React from 'react'

type Props = {
  title: string,
  text: React.ReactNode,
  img: string,
}

function DocumentUsage(props: Props) {
  const { title, text, img } = props;
  return (
    <div className=" flex items-center justify-between gap-3">
      <div className=" flex pt-16 px-6 gap-5">
        <div className=" flex flex-col gap-5 dark:text-gray-300">
          <div className=" font-extrabold text-lg">{ title }</div>
          { text }
        </div>
      </div>
      <Image src={ img } width="720" height="450" alt='ロゴ' />
    </div>
  )
}

export default DocumentUsage