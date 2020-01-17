import { ThreadsService } from '../backend/threadsService'
import fetch from 'isomorphic-unfetch'

const Thread = ({ id, title, description, comments, reactions }) => {
  const reactionsCount = Object.values(reactions).reduce(
    (sum, val) => val + sum,
    0
  )

  const commentsCount = comments.length

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
      </p>
      <p>
        {reactionsCount} {reactionsCount === 1 ? 'reaction' : 'reactions'}
      </p>
      <button
        onClick={() => {
          ThreadsService.addComment(id, {
            user: 'Ben Johnson',
            content: 'Added comment???',
          })
        }}
      >
        add comment
      </button>
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

const ROOT_URL = 'http://localhost:3000'

ThreadsPage.getInitialProps = async () => {
  const threads = await fetch(ROOT_URL + '/api/threads').then(res => res.json())
  return { threads }
}
