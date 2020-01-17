import { ThreadsService } from '../backend/threadsService'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { ROOT_URL } from '../constants'
import { useState } from 'react'

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

const AddThreadForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  return (
    <form
      onSubmit={ev => {
        ev.preventDefault()
        onSubmit({ title, content })
      }}
    >
      <label htmlFor="threadTitle">title</label>
      <input
        id="threadTitle"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
      />
      <label htmlFor="threadContent">content</label>
      <textarea
        id="threadContent"
        value={content}
        onChange={ev => setContent(ev.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export const ThreadsPage = ({ threads: initialThreads }) => {
  const [threads, setThreads] = useState(initialThreads)
  return (
    <div>
      {threads.map(thread => (
        <Thread key={thread.id} {...thread} />
      ))}

      <AddThreadForm
        onSubmit={form => {
          fetch('/api/threads', {
            method: 'POST',
            body: JSON.stringify(form),
          })
            .then(res => res.json())
            .then(thread =>
              setThreads(prevThreads => prevThreads.concat([thread]))
            )
        }}
      />
    </div>
  )
}

ThreadsPage.getInitialProps = async () => {
  const threads = await fetch(ROOT_URL + '/api/threads').then(res => res.json())
  return { threads }
}
