import ComposeForm from '@/app/(Content)/compose/components/ComposeForm'
import { redirect } from 'next/navigation'
import Modal from '@/app/components/Modal'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export default async function ComposeComment({ params }) {
  //=====I THINK I COULDNT PASS PARAMS TO THIS SERVER ACTION SO I KEPT IT IN THIS FILE =====
  //=====NEXT JS MIGHT PROVIDE A METHOD TO ADD MORE METHODS TO A SERVER ACTION =====
  async function postComment(formData: FormData) {
    'use server'
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    const bearerToken = `Bearer ${accessToken?.value}`
    const content = formData.get('content')
    const reqHeader = {
      Authorization: bearerToken,
      'Content-Type': 'application/json',
    }

    try {
      const response = await fetch(
        `http://localhost:8080/compose/comment/${params.threadid}`,
        {
          method: 'POST',
          headers: reqHeader,
          body: JSON.stringify({ content }),
        },
      )
      if (response.ok) {
        const result = await response.json()
        console.log('this should work for thwe comment route page ====', result)
        return result
      }
    } catch (err) {
      console.log(err)
      console.error(err, 'FAILED TO POST COMMENT')
    }

    revalidatePath(`/users/threads`)
    redirect(`/feed`)
  }

  return (
    <Modal threadType={'Comment'}>
      <ComposeForm postContent={postComment} />
    </Modal>
  )
}

// import ComposeForm from '@/app/(Content)/compose/components/ComposeForm'
// import Modal from '@/app/components/Modal'
// import { postComment } from '@/app/(Content)/compose/comment/page'

// export default async function ComposeComment() {
//   // async function postComment(formData: FormData) {
//   //   'use server'
//   //   const content = formData.get('content')

//   //   const response = await fetch(`http://localhost:8080/compose/comment`, {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({ content }),
//   //   })

//   //   const result = await response.json()
//   //   console.log('this should work', result)
//   //   return result
//   // }

//   return (
//     <Modal threadType={'Comment'}>
//       <ComposeForm postContent={postComment} />
//     </Modal>
//   )
// }
