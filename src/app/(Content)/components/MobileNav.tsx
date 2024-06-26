'use client'
import { callRefreshToken } from '@/app/lib/callRefreshToken'
import {
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MobileNav() {
  const [userData, setUserData] = useState<UserData | null>(null)
  // const [profileURL, setProfileURL] = useState('')

  useEffect(() => {
    ;(async () => {
      const data = await callRefreshToken()
      setUserData(data)
    })()
    // if (userData) {
    //   setProfileURL(`/users/${userData.user_uid}`)
    // } else {
    //   callRefreshToken(setUserData)
    // }
  }, [])

  return (
    <nav className="bg-white fixed bottom-0 w-full border-t border-gray-200 flex transition-transform translate-y-0 sm:translate-y-full dark:bg-gray-800 dark:border-gray-600 z-30">
      <Link
        href="/feed"
        className="flex flex-grow items-center justify-center p-2 text-indigo-500 hover:text-indigo-500"
      >
        <div className="text-center">
          <span className="flex justify-center h-9 text-3xl leading-8 items-center">
            <HomeIcon className="h-6 w-6 mx-1 stroke-[#9B6BFF]" />
          </span>
        </div>
      </Link>
      <Link
        href="/search"
        className="flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-indigo-500 dark:text-white"
      >
        <div className="text-center">
          <span className="flex justify-center h-9 text-3xl leading-8 items-center">
            <MagnifyingGlassIcon className="h-6 w-6 mx-1 stroke-[#9B6BFF]" />
          </span>
        </div>
      </Link>
      <Link
        href="/messages"
        className="flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-indigo-500 dark:text-white"
      >
        <div className="text-center">
          <span className="flex justify-center h-9 text-3xl leading-8 items-center">
            <EnvelopeIcon className="h-6 w-6 mx-1 stroke-[#9B6BFF]" />
          </span>
        </div>
      </Link>
      <Link
        href={userData ? `/users/${userData.user_uid}` : ``}
        className="flex flex-grow items-center justify-center p-2 text-gray-500 hover:text-indigo-500 dark:text-white"
      >
        <div className="text-center">
          <span className="flex justify-center h-9 text-3xl leading-8 items-center">
            <Image
              src="/undraw_profile_pic.svg"
              className="rounded-full h-6 w-6 mx-1 border-gray-600 border"
              alt="profile picture and dropdown"
              width={35}
              height={35}
              sizes=""
            />
          </span>
        </div>
      </Link>
    </nav>
  )
}
