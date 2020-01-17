import { ThreadsService } from '../backend/threadsService'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { ROOT_URL } from '../constants'

const Thread = ({ id, title, description, comments, reactions }) => {
  const reactionsCount = Object.values(reactions).reduce(
    (sum, val) => val + sum,
    0
  )

  const commentsCount = comments.length

  return (
    <div>
      <h2>
        <Link href="/[threadId]" as={`/${id}`}>
          <a>{title}</a>
        </Link>
      </h2>
      <p>{description}</p>
      <p>
        {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
      </p>
      <p>
        {reactionsCount} {reactionsCount === 1 ? 'reaction' : 'reactions'}
      </p>
    </div>
  )
}

export const ThreadsPage = ({ threads }) => {
  return (
    <div>
      {threads.map(thread => (
        <Thread key={thread.id} {...thread} />
      ))}
    </div>
  )
}

ThreadsPage.getInitialProps = async () => {
  const threads = await fetch(ROOT_URL + '/api/threads').then(res => res.json())
  return { threads }
}
