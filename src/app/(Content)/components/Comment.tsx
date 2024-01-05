'use client'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  commentData: Comment
  isLiked: boolean
}

interface Thread {
  thread_uid: string
  content: string
  ispublished: boolean
  thread_timestamp: string
  author_ref: string
  wreathe_user: PostUser
  comment: Array<Comment>
  likes: Array<Likes>
}

interface PostUser {
  user_uid: string
  first_name: string
  last_name: string
  username: string
}

interface Comment {
  comment_uid: string
  content: string
  ispublished: boolean
  comment_timestamp: string
  thread_ref: string
  author_ref: string
  wreathe_user: PostUser
  thread: Thread
  comment_likes: Array<CommentLikes>
}

interface Likes {
  user_uid: string
  thread_uid: string
}

interface CommentLikes {
  user_uid: string
  comment_uid: string
}

export default function Comment(props: Props) {
  return (
    <div className='border-gray-600 border rounded-md p-3'>
      <div className='flex items-center space-x-4'>
        <div className='relative h-12 w-12 z-20'>
          <Link href={`/users/${props.commentData.author_ref}`}>
            <Image
              src='/next.svg'
              className='rounded-full border border-white'
              alt='profile picture'
              layout='fill'
              objectFit='contain'
              // width={35}
              // height={35}
            />
          </Link>
        </div>
        <div className='relative font-medium dark:text-white z-20'>
          <Link
            href={`/users/e62092f1-a8ee-45de-ba19-3b28c7d1d221/threads/${props.commentData.thread.thread_uid}/comments/${props.commentData.comment_uid}`}
          >
            <div>
              <span>{props.commentData.wreathe_user.first_name}</span>
              <span> </span>
              <span>{props.commentData.wreathe_user.last_name}</span>
            </div>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              <span>@</span>
              <span>{props.commentData.wreathe_user.username}</span>
            </div>
          </Link>
        </div>
      </div>
      <h3 className='relative py-4 text-sm font-medium leading-5 text-black dark:text-white'>
        {props.commentData.content}
      </h3>

      <ul className='relative pt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500 z-20'>
        <li>{props.commentData.comment_timestamp}</li>
        <li>&middot;</li>
        <li className='cursor-pointer hover:text-white'>
          <Link href='#'>{0} comments</Link>
        </li>
        <li>&middot;</li>
        {/* <LikeButton isLiked={props.isLiked} commentData={props.commentData} /> */}
        {props.likeButton}
      </ul>
    </div>
  )
}
