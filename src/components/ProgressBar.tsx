import { twMerge } from 'tailwind-merge'

interface ProgressBarProps {
  percentage: number
}
export default function ProgressBar({ percentage }: ProgressBarProps) {
  let percentageWidth = 'w-[100%]'
  switch (percentage) {
    case 0:
      percentageWidth = 'w-[0%]'
      break
    case 5:
      percentageWidth = 'w-[5%]'
      break
    case 10:
      percentageWidth = 'w-[10%]'
      break
    case 15:
      percentageWidth = 'w-[15%]'
      break
    case 20:
      percentageWidth = 'w-[20%]'
      break
    case 25:
      percentageWidth = 'w-[25%]'
      break
    case 30:
      percentageWidth = 'w-[30%]'
      break
    case 35:
      percentageWidth = 'w-[35%]'
      break
    case 40:
      percentageWidth = 'w-[40%]'
      break
    case 45:
      percentageWidth = 'w-[45%]'
      break
    case 50:
      percentageWidth = 'w-[50%]'
      break
    case 55:
      percentageWidth = 'w-[55%]'
      break
    case 60:
      percentageWidth = 'w-[60%]'
      break
    case 65:
      percentageWidth = 'w-[65%]'
      break
    case 70:
      percentageWidth = 'w-[70%]'
      break
    case 75:
      percentageWidth = 'w-[75%]'
      break
    case 80:
      percentageWidth = 'w-[80%]'
      break
    case 85:
      percentageWidth = 'w-[85%]'
      break
    case 90:
      percentageWidth = 'w-[90%]'
      break
    case 95:
      percentageWidth = 'w-[95%]'
      break
    case 100:
      percentageWidth = 'w-[100%]'
      break
  }
  return (
    <div className="h-2 w-80 rounded bg-white">
      <div
        className={twMerge(percentageWidth, 'h-2 rounded bg-orange-400')}
      ></div>
    </div>
  )
}
