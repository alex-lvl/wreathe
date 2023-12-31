'use client'

import Form from './components/form'
import { useAuthContext } from '@/app/components/context'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect } from 'react'

export default function Register() {
  const router = useRouter()
  const { accessToken } = useAuthContext()

  useEffect(() => {
    if (accessToken) {
      return router.push('/')
    }
  }, [accessToken, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: { [key: string]: string } = {}
    formData.forEach((value, key) => {
      if (value instanceof File) {
        return new Error('FORM DATA CONTAINS HAS AN INSTANCE OF A FILE')
      } else {
        data[key] = value
      }
    })
    const jsonData = JSON.stringify(data)

    const res = await fetch('http://localhost:8080/register', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include', // Needed to include the cookie
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    })
    const result = await res.json()

    if (res.ok) {
      console.log(result.message)
      return router.push('/login')
    } else {
      console.log(result.error)
    }
  }

  return <Form handleSubmit={handleSubmit} />
}
