import { cn } from '@/lib/utils'
import React from 'react'

const Container = ({children, className}: {children: React.ReactNode, className?:string}) => {
  return (
    <div className={cn('mx-auto max-w-6xl xl:max-w-7xl px-8', className)}>
        {children}
    </div>
  )
}

export default Container



//divni ichidagi 'cn' nima ?
//- Bu cn qachonki biz Container componentidan foydalanganimizda aynan cn ichidagi
//listlar apply qiladi va agar classname bersak undagi style ham cnga qo'shilib apply qiladi 
//classname bo'lmasa cn ichidagi styleni o'zi apply qiladi