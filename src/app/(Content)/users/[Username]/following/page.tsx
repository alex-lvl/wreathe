import ThreadSkeleton from '@/app/(Content)/components/ThreadSkeleton'
import UserCard from '@/app/(Content)/components/UserCard'
import { Suspense } from 'react'

export default async function Following({
  params,
}: {
  params: { Username: string }
}) {
  const response = await fetch(
    `http://localhost:8080/users/${params.Username}/following`,
    {
      method: 'GET',
      mode: 'cors',
      //WEIRD BUG WHERE IF YOU INCLUDE CREDENTIALS, IT DOES NOT POPULATE THE QUERY OF A PRISMA QUERY: INCLUDE FIELD
      // credentials: 'include', // Needed to include the cookie
      next: { revalidate: 0 },
    }
  )
  const result = await response.json()

  console.log(result.following)

  return (
    <>
      <Suspense fallback={<ThreadSkeleton />}>
        <UserCard users={result.following} />
        <div>{result.message}</div>
        <div>{result.success}</div>
      </Suspense>
    </>
  )
}
