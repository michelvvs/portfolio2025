import { ArrowDownToDot } from 'lucide-react'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface SessionProps {
  children: ReactNode
  textColor: string
  className?: string
}

export default function Session({
  children,
  textColor,
  className
}: SessionProps) {
  return (
    <div
      className={twMerge(
        className,
        'flex-col place-content-between sm:pt-24 lg:pt-40 pb-12 font-poppins'
      )}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}
