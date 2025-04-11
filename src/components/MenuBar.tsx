import { MenuIcon } from 'lucide-react'

export default function MenuBar() {
  return (
    <div className="fixed h-12 w-full bg-emerald-500">
      <div className="m-4 flex justify-between">
        <div className="font-poppins font-bold uppercase text-white">
          michelvvs.com
        </div>
        <div className="font-poppins font-bold uppercase text-white">
          <MenuIcon />
        </div>
      </div>
    </div>
  )
}
