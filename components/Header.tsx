import ButtonAnimated from './ButtonAnimated'
import Logo from './Logo'


const Header = () => {
  return (
    <header className='h-[88px] bg-black/20 backdrop-blur-2xl fixed top-0 left-0 right-0 z-10 flex items-center'>
      <div className='container mx-auto flex justify-between items-center px-6 xl:px-0'>
        {/* logo */}
        <div className="flex items-center space-x-2">
          <Logo />
          <p className="font-bold text-xl">FitTracker</p>
        </div>
        {/* btn */}
        <ButtonAnimated variant="secondary" btnText="Get started" />
      </div>
    </header>
  )
}

export default Header