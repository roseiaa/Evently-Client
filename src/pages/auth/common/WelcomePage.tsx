import welcomeImage from '../../../assets/phone.png'
function WelcomePage() {
  return (
    <div className='h-screen flex items-center justify-center bg-primary w-full'>
      <div className='flex flex-col gap-1 justify-center items-center'>
        <img src={welcomeImage} alt="phone image" className='w-64 h-56 animate-pulse'/>
        <h1 className='text-titles text-5xl text-center font-semibold evently '>
            EVENTLY
        </h1>
        <p className='text-gray-200 text-2xl'>
            New Activities! New Opportunities! Same old Fun!
        </p>
      </div>
    </div>
  )
}

export default WelcomePage
