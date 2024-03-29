'use client'
import { useState, useEffect } from 'react'
import Thread from '../../components/Thread'
import ScrollToTopButton from '../../components/ScrollButton'
import { Suspense } from 'react'
import ThreadSkeleton from '../../components/ThreadSkeleton'
import { cookies } from 'next/headers'
import { useAuthContext } from '@/app/components/context'
import { redirect } from 'next/dist/server/api-utils'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Content(props) {
  const [refreshing, setRefreshing] = useState(false)
  const [feedData, setFeedData] = useState([])
  const { userData, isLoading, accessToken } = useAuthContext()

  useEffect(() => {
    if (userData) {
      const feed1 = props.feedData.map((post) => {
        const isLiked = post.likes.some(
          (like) =>
            like.user_uid === userData.user_uid &&
            like.thread_uid === post.thread_uid
        )
        return <Thread key={post.thread_uid} isLiked={isLiked} thread={post} />
      })
      setFeedData(feed1)
    }
    const handleRefresh = () => {
      // Add your refresh logic here
      // For example, you can fetch new data from an API

      // Simulate an asynchronous operation (remove this in real implementation)
      setRefreshing(true)
      setTimeout(() => {
        setRefreshing(false)
      }, 1500)
    }

    window.addEventListener('scroll', handleRefresh)

    return () => {
      window.removeEventListener('scroll', handleRefresh)
    }
  }, [userData])

  return (
    //overflow-y-auto was here replaced in layout
    <main className='px-2 sm:px-4 h-full'>
      <ScrollToTopButton />
      <ul className='overflow-y-auto'>
        <Suspense
          fallback={
            <>
              <ThreadSkeleton /> <ThreadSkeleton /> <ThreadSkeleton />
              <ThreadSkeleton />
            </>
          }
        >
          {feedData}
        </Suspense>
      </ul>
    </main>
  )
}
