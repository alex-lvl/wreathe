import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <h2 className='text-center py-2'>@name</h2>
      <div className='my-4 flex items-center justify-center'>
        <div className='relative h-20 w-20'>
          <Image
            src='/undraw_profile_pic.svg'
            className='rounded-full border-2 border-white'
            alt='profile picture and dropdown'
            layout='fill'
            objectFit='cover'
          />
        </div>
      </div>
      <div className='py-2 font-medium text-center dark:text-white '>
        <h3>Jane Doe</h3>
        <h5 className='text-sm text-gray-500 dark:text-gray-400'>@name</h5>
      </div>
      <div className='flex flex-row flex-wrap text-center py-2 my-4'>
        <div className='basis-1/3'>
          <h4 className='text-gray-200 text-sm'>Posts</h4>
          <h2 className='py-2 text-xl font-semibold'>0</h2>
        </div>
        <div className='basis-1/3'>
          <h4 className='text-gray-200 text-sm'>Followers</h4>
          <h2 className='py-2 text-xl font-semibold'>0</h2>
        </div>
        <div className='basis-1/3'>
          <h4 className='text-gray-200 text-sm'>Subscribers</h4>
          <h2 className='py-2 text-xl font-semibold'>0</h2>
        </div>
      </div>
    </header>
  )
}