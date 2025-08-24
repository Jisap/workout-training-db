import Image from "next/image"
import Link from "next/link"



const Logo = () => {
  return (
    <Link href="/" className="relative w-[60px] h-[60px] flex">
      <Image
        src="/logo-fittracker.png"
        fill
        alt="logo"
        className="object-contain"
      />
    </Link>
  )
}

export default Logo