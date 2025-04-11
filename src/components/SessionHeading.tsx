import { twMerge } from 'tailwind-merge'

interface SessionHeadingProps {
  title: string
  subtitle: string
  className?: string
  colorSubTitle?: string
  colorTitle?: string
}
export default function SessionHeading({
  title,
  subtitle,
  className,
  colorSubTitle,
  colorTitle
}: SessionHeadingProps) {
  return (
    <div
      className={twMerge(
        className,
        'mx-auto mb-12 flex-col text-center font-poppins'
      )}
    >
      <h5 className={twMerge(colorSubTitle, 'text-2xl uppercase')}>
        {subtitle}
      </h5>
      <h3 className={twMerge(colorTitle, 'text-4xl font-bold uppercase ')}>
        {title}
      </h3>
    </div>
  )
}
